<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';

	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	import {
		Sidebar,
		SidebarDropdownWrapper,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper
	} from 'flowbite-svelte';
	import {
		ChartPieSolid,
		AngleDownOutline,
		AngleUpOutline,
		ClipboardListSolid,
		CogOutline,
		FileChartBarSolid,
		GithubSolid,
		LayersSolid,
		LifeSaverSolid,
		LockSolid,
		RectangleListSolid,
		TableColumnSolid
	} from 'flowbite-svelte-icons';

	let drawerHidden: boolean = false;

	const closeDrawer = () => {
		drawerHidden = true;
	};

	let spanClass = 'ms-9';
	let childClass =
		'p-2 hover:bg-gray-100 text-gray-500 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 relative flex items-center flex-wrap font-medium';

	let nonActiveClass =
		childClass +
		' hover:text-gray-500 hover:cursor-pointer dark:text-gray-400 dark:hover:text-white';
	let activeClass = childClass + ' cursor-default dark:text-primary-700';

	$: mainSidebarUrl = $page.url.pathname;
	let activeMainSidebar: string;

	let operationResultTypes: unknown = {};

	afterNavigate((navigation) => {
		// this fixes https://github.com/themesberg/flowbite-svelte/issues/364
		document.getElementById('svelte')?.scrollTo({ top: 0 });
		closeDrawer();

		activeMainSidebar = navigation.to?.url.pathname ?? '';

		// const key = fileDir(activeMainSidebar);
		// for (const k in dropdowns) dropdowns[k] = false;
		// dropdowns[key] = true;
	});

	import { invoke } from '@tauri-apps/api/tauri';
	import { CodesandboxLogo } from 'radix-icons-svelte';

	let name = '';
	let resultList = '';

	async function query_database() {
		resultList = await invoke('query_database');
	}

	//let operationResultTypes = ''

	afterNavigate(async () => {
		console.log('HERE');
		await loadItemList();
	});

	async function loadItemList() {
		const response = JSON.parse(await invoke('query_result_types'));
		console.log('Response from service');
		console.log(response);
		const values = Object.create(null);
		let count = 0;
		for (let item of response) {
			let value = item['result_type'];
			let resultCount = item['count'];
			// Cast to string if needed
			let stringValue = String(value);

			// Construct index
			let index = `Result ${stringValue} (${resultCount})`;

			// Log for debug
			console.log(index);

			// Add to values
			values[index] = '/sidebar/crud/results/?operation_type=' + stringValue;
			count++;
			console.log(count);
		}
		let resultsExist = false;
		for (let post of posts) {
			if (post.name == 'Results') {
				resultsExist = true;
			}
		}
		if (!resultsExist) {
			posts.push({
				name: 'Results',
				icon: RectangleListSolid,
				children: values
			});
		}

		/*
		for (let post of posts ){
			if (post.name=="Results"){
				post.children = values
			}
		}*/
		posts = posts; // To trigger re-render
		//console.log(posts);

		return values;
	}

	let posts = [
		{ name: 'Dashboard', icon: ChartPieSolid, href: '/dashboard' },
		{
			name: 'Layouts',
			icon: TableColumnSolid,
			children: {
				Stacked: '/layouts/stacked',
				Sidebar: ''
			}
		},
		{
			name: 'CRUD',
			icon: RectangleListSolid,
			children: {
				Products: '/sidebar/crud/products',
				Users: '/sidebar/crud/users'
			}
		},

		{ name: 'Settings', icon: CogOutline, href: '/settings' },
		{
			name: 'Pages',
			icon: FileChartBarSolid,
			children: {
				Pricing: '/pages/pricing',
				Maintenance: '/errors/400',
				'404 not found': '/errors/404',
				'500 server error': '/errors/500'
			}
		},
		{
			name: 'Authenication',
			icon: LockSolid,
			children: {
				'Forgot password': '/authentication/forgot-password',
				'Profile lock': '/authentication/profile-lock',
				'Reset password': '/authentication/reset-password',
				'Sign in': '/authentication/sign-in',
				'Sign up': '/authentication/sign-up'
			}
		},
		{
			name: 'Playground',
			icon: LockSolid,
			children: {
				Stacked: '/playground/stacked',
				Sidebar: '/playground/sidebar'
			}
		}
	];
	let dropdowns = Object.fromEntries(Object.keys(posts).map((x) => [x, false]));

	async function run_python_class_parameter() {
		let resultsFromPython = JSON.parse(await invoke('run_python_class_parameter'));
		console.log('Run results with class parameter-->');
		console.log(resultsFromPython);
	}

	async function run_python_method_parameter() {
		let resultsFromPython = JSON.parse(await invoke('run_python_method_parameter'));
		console.log('Run results with method parameter-->');
		console.log(resultsFromPython);
	}

	async function run_python_time() {
		await invoke('run_python_test_time');
		console.log('Run results time-->');
	}
</script>

<Sidebar
	class={drawerHidden ? 'hidden' : ''}
	{nonActiveClass}
	{activeClass}
	activeUrl={mainSidebarUrl}
	asideClass="fixed inset-0 z-30 flex-none h-full w-64 lg:h-auto border-e border-gray-200 dark:border-gray-600 lg:overflow-y-visible lg:pt-20 lg:-mt-2 lg:block"
>
	<SidebarWrapper
		divClass="overflow-y-auto px-4 pt-20 lg:pt-4 h-full bg-white scrolling-touch max-w-2xs lg:h-[calc(100vh-4.5rem)] lg:block dark:bg-gray-800 lg:me-0 lg:sticky top-2"
	>
		<nav class="divide-y text-base font-medium">
			<SidebarGroup ulClass="list-unstyled fw-normal small mb-4 space-y-2">
				{#if posts}
					{#each posts as { name, icon, children, href } (name)}
						{#if children}
							<SidebarDropdownWrapper
								bind:isOpen={dropdowns[name]}
								label={name}
								ulClass="mt-0.5"
								btnClass="flex p-2 rounded-lg items-center justify-start gap-4 w-full text-base font-medium tracking-wide hover:text-primary-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
								spanClass=""
								class={dropdowns[name]
									? 'text-primary-700 dark:text-white'
									: 'text-gray-500 dark:text-gray-400'}
							>
								<AngleDownOutline slot="arrowdown" class="ms-auto text-gray-800 dark:text-white" />
								<AngleUpOutline slot="arrowup" class="ms-auto text-gray-800 dark:text-white" />
								<svelte:component this={icon} slot="icon" />
								{#each Object.entries(children) as [title, href]}
									<SidebarItem
										label={title}
										{href}
										{spanClass}
										{activeClass}
										active={activeMainSidebar === href}
									/>
								{/each}
							</SidebarDropdownWrapper>
						{:else}
							<SidebarItem label={name} {href}>
								<svelte:component this={icon} slot="icon" />
							</SidebarItem>
						{/if}
					{/each}
				{/if}
			</SidebarGroup>
			<SidebarGroup ulClass="list-unstyled fw-normal small pt-4 space-y-2">
				<SidebarItem
					label="GitHub Repository"
					href="https://github.com/themesberg/flowbite-svelte-admin-dashboard"
					target="_blank"
				>
					<GithubSolid slot="icon" />
				</SidebarItem>
				<SidebarItem
					label="Flowbite Svelte"
					href="https://flowbite-svelte.com/docs/pages/quickstart"
					target="_blank"
				>
					<ClipboardListSolid slot="icon" />
				</SidebarItem>
				<SidebarItem
					label="Components"
					href="https://flowbite-svelte.com/docs/components/accordion"
					target="_blank"
				>
					<LayersSolid slot="icon" />
				</SidebarItem>
				<SidebarItem
					label="Support"
					href="https://github.com/themesberg/flowbite-svelte-admin-dashboard/issues"
					target="_blank"
				>
					<LifeSaverSolid slot="icon" />
				</SidebarItem>
				<SidebarItem label="Run Python Class Parameter" on:click={run_python_class_parameter}>
					<LifeSaverSolid slot="icon" />
				</SidebarItem>
				<SidebarItem label="Run Python Method Parameter" on:click={run_python_method_parameter}>
					<LifeSaverSolid slot="icon" />
				</SidebarItem>
				<SidebarItem label="Run Python Time" on:click={run_python_time}>
					<LifeSaverSolid slot="icon" />
				</SidebarItem>
			</SidebarGroup>
		</nav>
	</SidebarWrapper>
</Sidebar>

<div
	hidden={drawerHidden}
	class="fixed inset-0 z-20 bg-gray-900/50 dark:bg-gray-900/60"
	on:click={closeDrawer}
	on:keydown={closeDrawer}
	role="presentation"
/>
