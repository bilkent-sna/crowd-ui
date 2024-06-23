<script>
	import { DarkMode, NavBrand, NavHamburger, Navbar, Search, ToolbarButton } from 'flowbite-svelte';
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
	<div class="flex w-fit items-center justify-start">
		<NavBrand href="/" class="ms-2 md:me-24">
			<img src="/images/bilkent_social_systems_group.png" class="me-3 h-6 sm:h-8" alt="Temp Logo" />
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white sm:text-2xl">
				Crowd
			</span>
		</NavBrand>
		<div class="hidden lg:block lg:pl-3.5">
			<Search size="md" class="w-96 border" />
		</div>
	</div>

	<div class="ms-auto flex items-center gap-2 p-1">
		<!-- <ToolbarButton size="lg"><BellSolid /></ToolbarButton> -->
		<ToolbarButton size="lg" href="/">Home</ToolbarButton>
		<ToolbarButton size="lg" on:click={navigateProject}>Project</ToolbarButton>
		<ToolbarButton size="lg" on:click={navigateNetwork}>Network</ToolbarButton>
		<ToolbarButton size="lg" on:click={() => goto('/results')}>Results</ToolbarButton>
		<ToolbarButton size="lg" on:click={goMethods}>Method Lab</ToolbarButton>
		<ToolbarButton size="lg" href="/settings">Settings</ToolbarButton>
		<DarkMode />
		<NavHamburger />
	</div>
</Navbar>
