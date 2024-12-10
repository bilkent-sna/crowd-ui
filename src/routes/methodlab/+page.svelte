<script>
	import { Heading, P, Span } from 'flowbite-svelte';

	import { project, simulationName, simulationType, nodeOrEdge } from '$lib/stores/projects';

	import DiffusionMethodLab from './DiffusionMethodLab.svelte';
	import OtherMethodLab from './OtherMethodLab.svelte';
	import CustomMethodLab from './CustomMethodLab.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		console.log('nodeOrEdge:', $nodeOrEdge, 'simulationType:', $simulationType);
	});
</script>

<div class="text-center">
	<Heading tag="h1" class="mb-4" customSize="text-3xl font-bold  md:text-4xl lg:text-5xl">
		Method Lab
	</Heading>
</div>
{#if $simulationType === 'diffusion'}
	<Heading tag="h6" class="text-center">
		Project: <Span gradient>{$project.name}</Span>
	</Heading>
	<DiffusionMethodLab />
{:else if $simulationType === 'other' && $nodeOrEdge === 'edge'}
	<Heading tag="h6" class="text-center">
		Project: <Span gradient>{$project.name}</Span>
	</Heading>
	<OtherMethodLab />
{:else if $simulationType === 'other' && $nodeOrEdge === 'node'}
	<Heading tag="h6" class="text-center">
		Project: <Span gradient>{$project.name}</Span>
	</Heading>
	<CustomMethodLab />
{:else}
	<P>Simulation type is not defined yet. Select one from the project page.</P>
{/if}
