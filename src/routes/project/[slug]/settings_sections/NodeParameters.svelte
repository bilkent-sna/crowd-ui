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
		Radio
	} from 'flowbite-svelte';
	import {
		ArrowRightOutline,
		CirclePlusSolid,
		ListOutline,
		TrashBinSolid
	} from 'flowbite-svelte-icons';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function sendNodeParametersToParent() {
		dispatch('message', { name: 'nodeParameters', contents: nodeParameters });
	}

	let nodeParameterName = '';
	let numericalRange1;
	let numericalRange2;
	let addNodeParameterOpen = false;
	let chosenType;

	let categoryOptions = [];
	let addOptionName = '';
	let optionsString = '';

	let nodeNumerical = [];
	let nodeCategorical = [];

	$: nodeParameters = {
		numerical: nodeNumerical,
		categorical: nodeCategorical
	};

	$: console.log(nodeParameters);

	function addNodeCategorical() {
		addNodeParameterOpen = false;
		categoryOptions = optionsString.split(',').map((item) => item.trim());
		nodeCategorical = [...nodeCategorical, { name: nodeParameterName, options: categoryOptions }];
		nodeParameterName = '';
		optionsString = '';
		categoryOptions = [];
	}

	function addNodeNumerical() {
		addNodeParameterOpen = false;
		nodeNumerical = [
			...nodeNumerical,
			{ name: nodeParameterName, range: [numericalRange1, numericalRange2] }
		];
		nodeParameterName = '';
		numericalRange1 = 0;
		numericalRange2 = 0;
	}

	function removeNodeParameter(type, name) {
		if (type === 'numerical') {
			nodeNumerical = nodeNumerical.filter((item) => item.name !== name);
		} else if (type === 'categorical') {
			nodeCategorical = nodeCategorical.filter((item) => item.name !== name);
		}
	}
</script>

<A on:click={() => (addNodeParameterOpen = true)} size="sm" class="my-2"
	><CirclePlusSolid class="mr-2 h-4 w-4" /> Add a node parameter</A
>
<Heading
	tag="h2"
	customSize="text-md font-semibold"
	class="text-md font-semibold  text-gray-900 dark:text-white">Numerical parameters:</Heading
>
<List tag="ul" list="none" class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
	{#each nodeNumerical as parameter}
		<Li class="pb-3 sm:pb-4">
			<div class="flex items-center space-x-4 rtl:space-x-reverse">
				<div class="flex-shrink-0">
					<ListOutline />
				</div>
				<div class="min-w-0 flex-1">
					<p class="truncate text-sm font-medium text-gray-900 dark:text-white">{parameter.name}</p>
					<p class="truncate text-sm text-gray-500 dark:text-gray-400">
						Range: {parameter.range}
					</p>
				</div>
				<div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
					<A on:click={() => removeNodeParameter('numerical', parameter.name)}><TrashBinSolid /></A>
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
	{#each nodeCategorical as parameter}
		<Li class="pb-3 sm:pb-4">
			<div class="flex items-center space-x-4 rtl:space-x-reverse">
				<div class="flex-shrink-0">
					<ListOutline />
				</div>
				<div class="min-w-0 flex-1">
					<p class="truncate text-sm font-medium text-gray-900 dark:text-white">{parameter.name}</p>
					<p class="truncate text-sm text-gray-500 dark:text-gray-400">
						Options in this category: {parameter.options}
					</p>
				</div>
				<div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
					<A on:click={() => removeNodeParameter('categorical', parameter.name)}
						><TrashBinSolid /></A
					>
				</div>
			</div>
		</Li>
	{/each}
</List>
<GradientButton color="purpleToBlue" size="xs" class="mt-2" on:click={sendNodeParametersToParent}
	>Save</GradientButton
>

<Modal bind:open={addNodeParameterOpen} size="xs" autoclose={false} class="w-full">
	<form class="flex flex-col space-y-6">
		<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add a node parameter</h3>
		<Label class="space-y-2">
			<span>Enter a name for the node parameter:</span>
			<Input placeholder="nodetype name" required bind:value={nodeParameterName} />
		</Label>
		<Label class="space-y-2">
			<span>Choose the parameter type:</span>
			<Radio name="category-choose" bind:group={chosenType} value="numerical">Numerical</Radio>
			<Radio name="category-choose" bind:group={chosenType} value="categorical">Categorical</Radio
			></Label
		>

		{#if chosenType === 'numerical'}
			<Label class="space-y-2">
				<span>Set the min value of the range:</span>
				<Input placeholder="10" required bind:value={numericalRange1} />
			</Label>
			<Label class="space-y-2">
				<span>Set the max value of the range:</span>
				<Input placeholder="100" required bind:value={numericalRange2} />
			</Label>
			<Button class="w-full1" on:click={addNodeNumerical}>
				Add node parameter<ArrowRightOutline class="ms-2 h-6 w-6" />
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
			<Button class="w-full1" on:click={addNodeCategorical}>
				Add node parameter<ArrowRightOutline class="ms-2 h-6 w-6" />
			</Button>
		{/if}
	</form>
</Modal>
