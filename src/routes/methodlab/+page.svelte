<script>
	import { Heading, P, Span } from 'flowbite-svelte';

	import { project, simulationName, simulationType } from '$lib/stores/projects';

	import DiffusionMethodLab from './DiffusionMethodLab.svelte';
	import CustomMethodLab from './CustomMethodLab.svelte';

	simulationType.set('diffusion');
</script>

<div class="text-center">
	<Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl">
		Method Lab
	</Heading>

	<Heading tag="h6">
		Project: <Span gradient>{$project.name}</Span>
	</Heading>
	<Heading tag="h6" class="mb-4">
		Simulation: <Span gradient>{$simulationName}</Span>
	</Heading>
</div>
{#if $simulationType === 'diffusion'}
	<DiffusionMethodLab />
{:else if $simulationType === 'other'}
	<CustomMethodLab />
{:else}
	<P>Simulation type is not defined yet. Select one from the project page.</P>
{/if}
