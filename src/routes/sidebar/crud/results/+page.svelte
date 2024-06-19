<script lang="ts">
	import { page } from '$app/stores'
	import { afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';

	import { invoke } from '@tauri-apps/api/tauri'

	import {
		Avatar,
		Breadcrumb,
		BreadcrumbItem,
		Button,
		Checkbox,
		Heading,
		Indicator
	} from 'flowbite-svelte';
	import { Input, Table, TableBody, TableBodyCell, TableBodyRow, TableHead } from 'flowbite-svelte';
	import { TableHeadCell, Toolbar, ToolbarButton, ToolbarGroup } from 'flowbite-svelte';
	import { CogOutline, DotsVerticalOutline, DownloadSolid } from 'flowbite-svelte-icons';
	import {
		EditOutline,
		ExclamationCircleSolid,
		PlusOutline,
		TrashBinSolid
	} from 'flowbite-svelte-icons';
	import Users from '../../../data/users.json';
	import { imagesPath } from '$lib/variables';

	import User from './Result.svelte';
	import Delete from './Delete.svelte';

	let openUser: boolean = false; // modal control
	let openDelete: boolean = false; // modal control

	let current_user: any = {};
	$: result_type = $page.url.searchParams.get('operation_type');
	console.log("Operation type:" + result_type);

	afterNavigate(async () => {
		if (result_type != undefined){
			console.log("operation_id:"+result_type);
			console.log("Trying to load results");
			await loadResults();
		}
	});	

	let Results: any[] = [];
	let resultKeys: any[] = [];
	async function loadResults() {
		const response =  JSON.parse(await invoke('get_results_by_type', {result_type:result_type}));
		console.log("Response from service in loadResults");
		console.log(response);
		Results = [];
		let count = 0;
		for (let item of response) {

			//let value = item["operation_type"];
			console.log(item);
			let jsonResult = JSON.parse(item["json_result"]);
			Results.push(jsonResult);

		}
		console.log(Results);
		resultKeys = Object.keys(Results[0]);
		return Results;
  	}

  import { Drawer, CloseButton } from 'flowbite-svelte';
  import { InfoCircleSolid, ArrowRightOutline } from 'flowbite-svelte-icons';
  import { sineIn } from 'svelte/easing';

  let hidden6 = true;
  let transitionParamsRight = {
    x: 320,
    duration: 200,
    easing: sineIn
  };

  let clickedResult: { [x: string]: any; } | null = null;

  function handleClick(parameter: { [x: string]: any; } | null){
	hidden6 = false;
	clickedResult = parameter;
	console.log("clickedResult---->");
	console.log(clickedResult);
  }
</script>


<main class="relative h-full w-full overflow-y-auto bg-gray-50 p-4 dark:bg-gray-900">
	<Breadcrumb class="mb-5">
		<BreadcrumbItem home>Home</BreadcrumbItem>
		<BreadcrumbItem href="/crud/users">Users</BreadcrumbItem>
		<BreadcrumbItem>List</BreadcrumbItem>
	</Breadcrumb>
	<Heading tag="h1" class="mb-4 text-xl sm:text-2xl">Hello from Operation results for operation_type {result_type}</Heading>

	<Toolbar embedded class="-mx-2 w-full p-2 text-gray-500 dark:text-gray-400">
		<ToolbarGroup class="w-80 xl:w-96">
			<Input placeholder="Search for users" />
		</ToolbarGroup>
		<ToolbarGroup>
			<ToolbarButton><CogOutline /></ToolbarButton>
			<ToolbarButton><TrashBinSolid /></ToolbarButton>
			<ToolbarButton><ExclamationCircleSolid /></ToolbarButton>
			<ToolbarButton><DotsVerticalOutline /></ToolbarButton>
		</ToolbarGroup>
		<div slot="end" class="space-x-2">
			<Button
				size="sm"
				class="gap-2 whitespace-nowrap"
				on:click={() => ((current_user = {}), (openUser = true))}
			>
				<PlusOutline size="xs" />Add user
			</Button>
			<Button size="sm" color="alternative" class="gap-2">
				<DownloadSolid size="xs" />Export
			</Button>
		</div>
	</Toolbar>

	<Table>
		<TableHead class="border-y border-gray-200 bg-gray-100 dark:border-gray-700">
			<TableHeadCell><Checkbox /></TableHeadCell>
			
			{#each resultKeys as key}
			<TableHeadCell>{key}</TableHeadCell>
			{/each}
		</TableHead>
		<TableBody>
			{#each Results as result}
				<TableBodyRow  on:click={() => handleClick(result)}>
					<TableBodyCell><Checkbox /></TableBodyCell>
					{#each resultKeys as key}
					<TableBodyCell>
						{result[key]}
					</TableBodyCell>
					{/each}
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>

</main>


<Drawer placement="right" transitionType="fly" transitionParams={transitionParamsRight} bind:hidden={hidden6} id="sidebar6">
	<div class="flex items-center">
	  <h5 id="drawer-label" class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">
		<InfoCircleSolid class="w-4 h-4 me-2.5" />Info
	  </h5>
	  <CloseButton on:click={() => (hidden6 = true)} class="mb-4 dark:text-white" />
	</div>
	<p class="mb-6 text-sm text-gray-500 dark:text-gray-400">
		
		
	  Supercharge your hiring by taking advantage of our <a href="/" class="text-primary-600 underline dark:text-primary-500 hover:no-underline"> limited-time sale </a>
	  for Flowbite Docs + Job Board. Unlimited access to over 190K top-ranked candidates and the #1 design job board.
	  
	</p>
	<div class="grid grid-cols-2 gap-4">
	  <Button color="light" href="/">Learn more</Button>
	  <Button href="/" class="px-4">Get access <ArrowRightOutline class="w-3.5 h-3.5 ms-2" /></Button>
	</div>
	
	
	<Table>
		<TableHead class="border-y border-gray-200 bg-gray-100 dark:border-gray-700">
			<TableHeadCell><Checkbox /></TableHeadCell>
			
			{#each resultKeys as key}
			<TableHeadCell>{key}</TableHeadCell>
			{/each}
		</TableHead>
		<TableBody>
			<TableBodyRow>
				<TableBodyCell><Checkbox /></TableBodyCell>
				{#each resultKeys as key}
				<TableBodyCell>
					{clickedResult[key]}
				</TableBodyCell>
				{/each}
			</TableBodyRow>
		</TableBody>
	</Table>
  </Drawer>

<!-- Modals -->

<User bind:open={openUser} data={current_user} />
<Delete bind:open={openDelete} />




