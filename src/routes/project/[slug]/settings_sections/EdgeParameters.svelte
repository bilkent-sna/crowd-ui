<script>
	// @ts-nocheck

	import {
		List,
		Li,
		A,
		Heading,
		Modal,
		Label,
		Input,
		Button,
		GradientButton,
		Radio,
		Helper
	} from 'flowbite-svelte';
	import {
		ArrowRightOutline,
		CirclePlusSolid,
		LinkOutline,
		TrashBinSolid
	} from 'flowbite-svelte-icons';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function sendEdgeParametersToParent() {
		dispatch('message', { name: 'edgeParameters', contents: edgeParameters });
	}

	let edgeParameterName = '';
	let numericalFormula = '';
	let addEdgeParameterOpen = false;
	let chosenType;

	let categoryOptions = [];
	let addOptionName = '';
	let optionsString = '';

	let edgeNumerical = [];
	let edgeCategorical = [];

	$: edgeParameters = {
		numerical: edgeNumerical,
		categorical: edgeCategorical
	};

	$: console.log(edgeParameters);

	function addEdgeCategorical() {
		addEdgeParameterOpen = false;
		categoryOptions = optionsString.split(',').map((item) => item.trim());
		edgeCategorical = [...edgeCategorical, { name: edgeParameterName, options: categoryOptions }];
		edgeParameterName = '';
		optionsString = '';
		categoryOptions = [];
	}

	function addEdgeNumerical() {
		addEdgeParameterOpen = false;
		edgeNumerical = [...edgeNumerical, { name: edgeParameterName, weight: numericalFormula }];
		edgeParameterName = '';
		numericalFormula = '';
	}

	function removeEdgeParameter(type, name) {
		if (type === 'numerical') {
			edgeNumerical = edgeNumerical.filter((item) => item.name !== name);
		} else if (type === 'categorical') {
			edgeCategorical = edgeCategorical.filter((item) => item.name !== name);
		}
	}
</script>

<A on:click={() => (addEdgeParameterOpen = true)} size="sm" class="my-2"
	><CirclePlusSolid class="mr-2 h-4 w-4" /> Add an edge parameter</A
>
<Heading
	tag="h2"
	customSize="text-md font-semibold"
	class="text-md font-semibold  text-gray-900 dark:text-white">Numerical parameters:</Heading
>
<List tag="ul" list="none" class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
	{#each edgeNumerical as parameter}
		<Li class="pb-3 sm:pb-4">
			<div class="flex items-center space-x-4 rtl:space-x-reverse">
				<div class="flex-shrink-0">
					<LinkOutline />
				</div>
				<div class="min-w-0 flex-1">
					<p class="truncate text-sm font-medium text-gray-900 dark:text-white">{parameter.name}</p>
					<p class="truncate text-sm text-gray-500 dark:text-gray-400">
						Weight: {parameter.weight}
					</p>
				</div>
				<div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
					<A on:click={() => removeEdgeParameter('numerical', parameter.name)}><TrashBinSolid /></A>
				</div>
			</div>
		</Li>
	{/each}
</List>

<Heading
	tag="h2"
	customSize="text-md font-semibold"
	class="text-md font-semibold  text-gray-900 dark:text-white">Categorical parameters:</Heading
>
<List tag="ul" list="none" class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
	{#each edgeCategorical as parameter}
		<Li class="pb-3 sm:pb-4">
			<div class="flex items-center space-x-4 rtl:space-x-reverse">
				<div class="flex-shrink-0">
					<LinkOutline />
				</div>
				<div class="min-w-0 flex-1">
					<p class="truncate text-sm font-medium text-gray-900 dark:text-white">{parameter.name}</p>
					<p class="truncate text-sm text-gray-500 dark:text-gray-400">
						Options in this category: {parameter.options}
					</p>
				</div>
				<div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
					<A on:click={() => removeEdgeParameter('categorical', parameter.name)}
						><TrashBinSolid /></A
					>
				</div>
			</div>
		</Li>
	{/each}
</List>
<GradientButton color="purpleToBlue" size="xs" class="mt-2" on:click={sendEdgeParametersToParent}
	>Save</GradientButton
>

<Modal bind:open={addEdgeParameterOpen} size="xs" autoclose={false} class="w-full">
	<form class="flex flex-col space-y-6">
		<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add an edge parameter</h3>
		<Label class="space-y-2">
			<span>Enter a name for the edge parameter:</span>
			<Input placeholder="edge parameter name" required bind:value={edgeParameterName} />
		</Label>
		<Label class="space-y-2">
			<span>Choose the parameter type:</span>
			<Radio name="category-choose" bind:group={chosenType} value="numerical">Numerical</Radio>
			<Radio name="category-choose" bind:group={chosenType} value="categorical">Categorical</Radio
			></Label
		>

		{#if chosenType === 'numerical'}
			<Label class="space-y-2">
				<span>Enter either an integer or a formula to calculate edge weight:</span>
				<Input placeholder="int((u+v) % 10)" required bind:value={numericalFormula} />
			</Label>
			<Helper class="text-sm-gray mt-2">
				Reminder: You can use u (source node's value) and v (target node's value) in your formula.
				Other variable names are not accepted.
			</Helper>
			<Button class="w-full1" on:click={addEdgeNumerical}>
				Add edge parameter<ArrowRightOutline class="ms-2 h-6 w-6" />
			</Button>
		{:else if chosenType === 'categorical'}
			<!-- categorical -->
			<Label class="space-y-2">
				<span>Enter the name of the category you want to add:</span>
				<Input placeholder="gender" required bind:value={addOptionName} />
			</Label>
			<Label class="space-y-2">
				<span>Enter the options in the category, separated by a comma:</span>
				<Input placeholder="male, female" required bind:value={optionsString} />
			</Label>
			<Button class="w-full1" on:click={addEdgeCategorical}>
				Add edge parameter<ArrowRightOutline class="ms-2 h-6 w-6" />
			</Button>
		{/if}
	</form>
</Modal>
