<script>
	import {
		DarkMode,
		NavBrand,
		NavUl,
		NavLi,
		NavHamburger,
		Navbar,
		Search,
		ToolbarButton
	} from 'flowbite-svelte';
	import { BellSolid } from 'flowbite-svelte-icons';
	import '../../app.pcss';
	import { goto } from '$app/navigation';
	import { project, simulationName } from '$lib/stores/projects';
	import { generateSlug } from '$lib/utils';

	export let fluid = true;

	function goMethods() {
		console.log('Go methods clicked');
		goto('/methodlab')
			.then(() => {
				console.log('Navigated to Method Lab');
			})
			.catch((error) => {
				console.error('Navigation error:', error);
			});
	}
	function navigateNetwork() {
		if ($project.name !== '' && $simulationName !== '') {
			goto('/graph/' + generateSlug($simulationName));
		}
	}
	function navigateProject() {
		if ($project.name !== '') {
			goto('/project/' + generateSlug($project.name));
		}
	}
</script>

<Navbar {fluid} color="default">
	<!-- <div class="flex w-fit items-center justify-start"> -->
	<NavBrand href="/" class="ms-2 md:me-24">
		<img src="/images/temp_logo.png" class="me-1 h-8 sm:h-12" alt="Temp Logo" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white sm:text-2xl">
			Crowd
		</span>
	</NavBrand>
	<!-- <div class="hidden lg:block lg:pl-3.5">
			<Search size="md" class="w-96 border" />
		</div> -->
	<NavHamburger />
	<NavUl>
		<NavLi href="/"><ToolbarButton class="text-gray-500  md:text-lg">Home</ToolbarButton></NavLi>
		<NavLi on:click={navigateProject}
			><ToolbarButton class="text-gray-500 md:text-lg">Project</ToolbarButton></NavLi
		>
		<NavLi on:click={navigateNetwork}
			><ToolbarButton class="text-gray-500 md:text-lg">Network</ToolbarButton></NavLi
		>
		<NavLi on:click={() => goto('/results')}
			><ToolbarButton class="text-gray-500 md:text-lg">Results</ToolbarButton></NavLi
		>
		<NavLi on:click={goMethods}
			><ToolbarButton class="text-gray-500 md:text-lg">Method Lab</ToolbarButton></NavLi
		>
		<NavLi href="/settings"
			><ToolbarButton class="text-gray-500 md:text-lg">Settings</ToolbarButton></NavLi
		>
		<NavLi href="/help"><ToolbarButton class="text-gray-500 md:text-lg">Help</ToolbarButton></NavLi>
		<NavLi><DarkMode /></NavLi>
	</NavUl>
	<!-- </div> -->
</Navbar>
