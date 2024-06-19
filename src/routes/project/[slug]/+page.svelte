<script>
	import { Heading, P, Button, Span, Spinner } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { invoke } from '@tauri-apps/api/tauri';
	import { project } from '$lib/stores/projects';

	import SimulationsList from './SimulationsList.svelte';
	import SimulationSettings from './SimulationSettings.svelte';

	let loadingProject = false;

	// onMount(async () => {
	// 	loadingProject = true;
	// 	try {
	// 		// Call the Python function through Tauri
	// 		//get yaml?
	// 		// const result = await invoke('run_python_test_time');
	// 		const projectData = { name: 'Hello' };

	// 		// Ensure projectData is an object
	// 		if (typeof projectData === 'object' && projectData !== null) {
	// 			project.set(projectData);
	// 		} else {
	// 			console.error('Expected an object, but got:', projectData);
	// 		}
	// 	} catch (error) {
	// 		console.error('Error fetching project details:', error);
	// 	} finally {
	// 		loadingProject = false;
	// 	}
	// });
</script>

{#if loadingProject}
	<div class="text-center">
		<Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl">
			Project: <Span gradient>{$project.name}</Span>
		</Heading>
		<P class="my-6 text-center text-lg dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48">
			{$project.info}
		</P>
		<Spinner class="mt-4" size="10" />
		<P class="my-2 text-center text-gray-400 dark:text-gray-400 sm:px-16 lg:text-lg xl:px-24"
			>Loading the project</P
		>
	</div>
{:else}
	<div class="text-center">
		<Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl">
			Project: <Span gradient>{$project.name}</Span>
		</Heading>
		<P class="my-6 text-center text-lg dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48">
			{$project.info}
		</P>
	</div>
{/if}

<SimulationsList />

<SimulationSettings />
