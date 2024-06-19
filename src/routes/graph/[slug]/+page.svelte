<script>
	import { onMount } from 'svelte';
	import { invoke } from '@tauri-apps/api/tauri';
	import { project, simulationName, simulationDirectory } from '$lib/stores/projects';
	import { Heading, P, Span, Spinner } from 'flowbite-svelte';
	import NetworkViz from './NetworkViz.svelte';

	// A boolean which will set to true when we are loading the simulation data
	// by sending a request to backend side
	let loadingSimulation = true;
	let simulationGraph;
	let simulationInfo;

	onMount(async () => {
		loadingSimulation = true;
		await loadSimulationGraph();
		await loadSimulationInfo();
		loadingSimulation = false;
	});

	async function loadSimulationInfo() {
		try {
			let result = await invoke('run_python_load_simulation_info', {
				project_name: $project.name,
				simulation_directory: $simulationDirectory
			});

			simulationInfo = JSON.parse(result);

			console.log('Simulation info in JS:', result);

			return result;
		} catch (error) {
			console.error('Error loading simulation info:', error);
		}
	}
	async function loadSimulationGraph() {
		try {
			let result = await invoke('run_python_load_simulation_graph', {
				project_name: $project.name,
				simulation_directory: $simulationDirectory
			});

			simulationGraph = JSON.parse(result);
			console.log('Simulation graph in JS:', result);

			return result;
		} catch (error) {
			console.error('Cannot load simulation graph', error);
		}
	}
</script>

{#if loadingSimulation}
	<div class="text-center">
		<Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl">
			Project: <Span gradient>{$project.name}</Span>
		</Heading>
		<P class="my-6 text-center text-lg dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48">
			Simulation: {$simulationName}
		</P>
		<Spinner class="mt-4" size="10" />
		<P class="my-2 text-center text-gray-400 dark:text-gray-400 sm:px-16 lg:text-lg xl:px-24">
			Loading the project
		</P>
	</div>
{:else}
	<div class="text-center">
		<Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl">
			Project: <Span gradient>{$project.name}</Span>
		</Heading>
		<P class="my-6 text-center text-lg dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48">
			Simulation: {$simulationName}
		</P>
	</div>
	{#if simulationGraph && simulationInfo}
		<NetworkViz data={simulationGraph} simulation_info={simulationInfo} />
	{:else}
		<div class="text-center">
			<Spinner class="mt-4" size="10" />
			<P class="my-2 text-center text-gray-400 dark:text-gray-400 sm:px-16 lg:text-lg xl:px-24">
				Loading simulation data
			</P>
		</div>
	{/if}
{/if}
