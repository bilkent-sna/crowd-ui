<script>
	import { Heading, P, Span } from 'flowbite-svelte';

	import { project, simulationName, simulationType } from '$lib/stores/projects';

	import DiffusionMethodLab from './DiffusionMethodLab.svelte';
	import CustomMethodLab from './CustomMethodLab.svelte';
</script>

<div class="text-center">
	<Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl">
		Method Lab
	</Heading>
</div>
{#if $simulationType === 'diffusion'}
	<Heading tag="h6" class="text-center">
		Project: <Span gradient>{$project.name}</Span>
	</Heading>
	<DiffusionMethodLab />
{:else if $simulationType === 'other'}
	<Heading tag="h6" class="text-center">
		Project: <Span gradient>{$project.name}</Span>
	</Heading>
	<CustomMethodLab />
{:else}
	<P>Simulation type is not defined yet. Select one from the project page.</P>
{/if}
