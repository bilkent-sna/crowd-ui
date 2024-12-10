<script>
	import { Heading, P, Button, Span, Spinner } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { invoke } from '@tauri-apps/api/tauri';
	import { project, simulationType, nodeOrEdge } from '$lib/stores/projects';

	import SimulationsList from './SimulationsList.svelte';
	import SimulationSettings from './SimulationSettings.svelte';

	let loadingProject = false;
</script>

{#if loadingProject}
	<div class="text-center">
		<Heading tag="h1" class="mb-4" customSize="text-3xl font-bold  md:text-4xl lg:text-5xl">
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
		<Heading tag="h1" class="mb-4" customSize="text-3xl font-bold  md:text-4xl lg:text-5xl">
			Project: <Span gradient>{$project.name}</Span>
		</Heading>
		<P class="my-6 text-center text-lg dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48">
			{$project.info}
		</P>
	</div>
{/if}

<SimulationsList />

<SimulationSettings />
