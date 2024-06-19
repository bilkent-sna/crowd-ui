<script>
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
		Select
	} from 'flowbite-svelte';
	import {
		ArrowRightOutline,
		CirclePlusSolid,
		GridPlusSolid,
		TrashBinSolid
	} from 'flowbite-svelte-icons';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let compartments = [];
	let currentCompartment = null;
	let compartmentName = '';
	$: compartmentNames = compartments.map((compartment) => compartment.name);
	$: console.log(compartments);
	$: console.log(compartmentNames);
	let selectedType = '';

	let addCompartmentOpen = false;

	let compartmentCounter = 0;

	function sendCompartmentsToParent() {
		dispatch('message', { name: 'compartments', contents: compartments });
	}

	let compartmentOptions = [
		{ value: 'node-stochastic', name: 'Node stochastic' },
		{ value: 'node-categorical', name: 'Node categorical' },
		{ value: 'node-numerical-attribute', name: 'Node numerical attribute' },
		{ value: 'node-numerical-variable', name: 'Node numerical variable' },
		{ value: 'node-threshold', name: 'Node treshold' },
		{ value: 'edge-categorical', name: 'Edge categorical' },
		{ value: 'edge-numerical', name: 'Edge numerical' },
		{ value: 'edge-stochastic', name: 'Edge stochastic' },
		{ value: 'count-down', name: 'Count down' },
		{ value: 'conditional-composition', name: 'Conditional composition' }
	];

	let nodeStochasticComp = {
		type: 'node-stochastic',
		ratio: 0,
		triggering_status: '',
		composed: ''
	};

	let nodeCategoricalComp = {
		type: 'node-categorical',
		attribute: '',
		value: '',
		probability: 1,
		composed: ''
	};

	let nodeNumericalAttrComp = {
		type: 'node-numerical-attribute',
		attribute: '',
		value: 0,
		operator: '',
		probability: 1,
		triggering_status: '',
		composed: ''
	};

	let nodeNumericalVarComp = {
		type: 'node-numerical-variable',
		variable: '',
		variable_type: 'attribute',
		value: '',
		value_type: 'attribute',
		operator: '<',
		probability: 1,
		triggering_status: '',
		composed: ''
	};

	let nodeTresholdComp = {
		type: 'node-treshold',
		treshold: 0.1,
		triggering_status: '',
		composed: ''
	};

	let edgeCategoricalComp = {
		type: 'edge-categorical',
		attribute: '',
		value: '',
		probability: 1,
		triggering_status: '',
		composed: ''
	};

	let edgeNumericalComp = {
		type: 'edge-numerical',
		attribute: '',
		value: 0,
		operator: '',
		probability: 1,
		triggering_status: '',
		composed: ''
	};

	let edgeStochasticComp = {
		type: 'edge-treshold',
		treshold: 0.1,
		triggering_status: '',
		composed: ''
	};

	let countDownComp = {
		type: 'count-down',
		name: '',
		iteration_count: 0
	};

	let conditionalCompositionComp = {
		type: 'conditional-composition',
		condition: '',
		first_branch: '',
		second_branch: ''
	};

	function setCurrent() {
		if (selectedType === 'node-stochastic') {
			currentCompartment = nodeStochasticComp;
		} else if (selectedType === 'node-categorical') {
			currentCompartment = nodeCategoricalComp;
		} else if (selectedType === 'node-numerical-attribute') {
			currentCompartment = nodeNumericalAttrComp;
		} else if (selectedType === 'node-numerical-variable') {
			currentCompartment = nodeNumericalVarComp;
		} else if (selectedType === 'node-treshold') {
			currentCompartment = nodeTresholdComp;
		} else if (selectedType === 'edge-categorical') {
			currentCompartment = edgeCategoricalComp;
		} else if (selectedType === 'edge-numerical') {
			currentCompartment = edgeNumericalComp;
		} else if (selectedType === 'edge-stochastic') {
			currentCompartment = edgeStochasticComp;
		} else if (selectedType === 'count-down') {
			currentCompartment = countDownComp;
		} else if (selectedType === 'conditional-composition') {
			currentCompartment = conditionalCompositionComp;
		}
	}

	function addCompartments() {
		compartmentCounter++;
		compartmentName = 'c' + compartmentCounter;
		addCompartmentOpen = false;
		compartments = [...compartments, { name: compartmentName, content: currentCompartment }];
		currentCompartment = null;
	}

	function removeNodeType(name) {
		compartments = compartments.filter((compartment) => compartment.name !== name);
	}
</script>

<Heading
	tag="h2"
	customSize="text-md font-semibold"
	class="text-md font-semibold  text-gray-900 dark:text-white">Compartments:</Heading
>

<A on:click={() => (addCompartmentOpen = true)} size="sm" class="my-2"
	><CirclePlusSolid class="mr-2 h-4 w-4" /> Add a compartment</A
>
<List tag="ul" list="none" class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
	{#each compartments as compartment, i}
		<Li class="pb-3 sm:pb-4">
			<div class="flex items-center space-x-4 rtl:space-x-reverse">
				<div class="flex-shrink-0">
					<GridPlusSolid />
				</div>
				<div class="min-w-0 flex-1">
					<p class="truncate text-sm font-medium text-gray-900 dark:text-white">
						{compartment.name}
					</p>
					<p class="truncate text-sm text-gray-500 dark:text-gray-400">
						{#each Object.entries(compartment.content) as [key, value]}
							<p>{key}: {value}</p>
						{/each}
					</p>
				</div>
				<div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
					<A on:click={() => removeNodeType(compartment.name)}><TrashBinSolid /></A>
				</div>
			</div>
		</Li>
	{/each}
</List>
<GradientButton color="purpleToBlue" size="xs" class="mt-2" on:click={sendCompartmentsToParent}
	>Save</GradientButton
>

<Modal bind:open={addCompartmentOpen} size="xs" autoclose={false} class="w-full">
	<form class="flex flex-col space-y-6">
		<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add a compartment</h3>
		<Label>
			Select a type of compartment:
			<Select
				class="mt-2"
				items={compartmentOptions}
				bind:value={selectedType}
				on:input={setCurrent}
			/>
		</Label>
		{#if selectedType === 'node-stochastic'}
			<div>
				<Label>Ratio:</Label>
				<Input type="number" bind:value={nodeStochasticComp.ratio} on:input={setCurrent} />
				<Label>Triggering Status:</Label>
				<Input
					type="text"
					bind:value={nodeStochasticComp.triggering_status}
					on:input={setCurrent}
				/>
				<Label>Composed:</Label>
				<Select bind:value={nodeStochasticComp.composed} on:change={setCurrent}>
					{#each compartmentNames as name}
						<option value={name}>{name}</option>
					{/each}
				</Select>
			</div>
		{:else if selectedType === 'node-categorical'}
			<div>
				<Label>Attribute:</Label>
				<Input type="text" bind:value={nodeCategoricalComp.attribute} on:input={setCurrent} />
				<Label>Value:</Label>
				<Input type="text" bind:value={nodeCategoricalComp.value} on:input={setCurrent} />
				<Label>Probability:</Label>
				<Input type="number" bind:value={nodeCategoricalComp.probability} on:input={setCurrent} />
				<Label>Composed:</Label>
				<Select bind:value={nodeStochasticComp.composed} on:change={setCurrent}>
					{#each compartmentNames as name}
						<option value={name}>{name}</option>
					{/each}
				</Select>
			</div>
		{:else if selectedType === 'node-numerical-attribute'}
			<div>
				<Label>Attribute:</Label>
				<Input type="text" bind:value={nodeNumericalAttrComp.attribute} on:input={setCurrent} />
				<Label>Value:</Label>
				<Input type="number" bind:value={nodeNumericalAttrComp.value} on:input={setCurrent} />
				<Label>Operator:</Label>
				<Input type="text" bind:value={nodeNumericalAttrComp.operator} on:input={setCurrent} />
				<Label>Probability:</Label>
				<Input type="number" bind:value={nodeNumericalAttrComp.probability} on:input={setCurrent} />
				<Label>Triggering Status:</Label>
				<Input
					type="text"
					bind:value={nodeNumericalAttrComp.triggering_status}
					on:input={setCurrent}
				/>
				<Label>Composed:</Label>
				<Select bind:value={nodeStochasticComp.composed} on:change={setCurrent}>
					{#each compartmentNames as name}
						<option value={name}>{name}</option>
					{/each}
				</Select>
			</div>
		{:else if selectedType === 'node-numerical-variable'}
			<div>
				<Label>Variable:</Label>
				<Input type="text" bind:value={nodeNumericalVarComp.variable} on:input={setCurrent} />
				<Label>Variable Type:</Label>
				<Input type="text" bind:value={nodeNumericalVarComp.variable_type} on:input={setCurrent} />
				<Label>Value:</Label>
				<Input type="text" bind:value={nodeNumericalVarComp.value} on:input={setCurrent} />
				<Label>Value Type:</Label>
				<Input type="text" bind:value={nodeNumericalVarComp.value_type} on:input={setCurrent} />
				<Label>Operator:</Label>
				<Input type="text" bind:value={nodeNumericalVarComp.operator} on:input={setCurrent} />
				<Label>Probability:</Label>
				<Input type="number" bind:value={nodeNumericalVarComp.probability} on:input={setCurrent} />
				<Label>Triggering Status:</Label>
				<Input
					type="text"
					bind:value={nodeNumericalVarComp.triggering_status}
					on:input={setCurrent}
				/>
				<Label>Composed:</Label>
				<Select bind:value={nodeStochasticComp.composed} on:change={setCurrent}>
					{#each compartmentNames as name}
						<option value={name}>{name}</option>
					{/each}
				</Select>
			</div>
		{:else if selectedType === 'node-threshold'}
			<div>
				<Label>Threshold:</Label>
				<Input type="number" bind:value={nodeTresholdComp.treshold} on:input={setCurrent} />
				<Label>Triggering Status:</Label>
				<Input type="text" bind:value={nodeTresholdComp.triggering_status} on:input={setCurrent} />
				<Label>Composed:</Label>
				<Select bind:value={nodeStochasticComp.composed} on:change={setCurrent}>
					{#each compartmentNames as name}
						<option value={name}>{name}</option>
					{/each}
				</Select>
			</div>
		{:else if selectedType === 'edge-categorical'}
			<div>
				<Label>Attribute:</Label>
				<Input type="text" bind:value={edgeCategoricalComp.attribute} on:input={setCurrent} />
				<Label>Value:</Label>
				<Input type="text" bind:value={edgeCategoricalComp.value} on:input={setCurrent} />
				<Label>Probability:</Label>
				<Input type="number" bind:value={edgeCategoricalComp.probability} on:input={setCurrent} />
				<Label>Triggering Status:</Label>
				<Input
					type="text"
					bind:value={edgeCategoricalComp.triggering_status}
					on:input={setCurrent}
				/>
				<Label>Composed:</Label>
				<Select bind:value={nodeStochasticComp.composed} on:change={setCurrent}>
					{#each compartmentNames as name}
						<option value={name}>{name}</option>
					{/each}
				</Select>
			</div>
		{:else if selectedType === 'edge-numerical'}
			<div>
				<Label>Attribute:</Label>
				<Input type="text" bind:value={edgeNumericalComp.attribute} on:input={setCurrent} />
				<Label>Value:</Label>
				<Input type="number" bind:value={edgeNumericalComp.value} on:input={setCurrent} />
				<Label>Operator:</Label>
				<Input type="text" bind:value={edgeNumericalComp.operator} on:input={setCurrent} />
				<Label>Probability:</Label>
				<Input type="number" bind:value={edgeNumericalComp.probability} on:input={setCurrent} />
				<Label>Triggering Status:</Label>
				<Input type="text" bind:value={edgeNumericalComp.triggering_status} on:input={setCurrent} />
				<Label>Composed:</Label>
				<Select bind:value={nodeStochasticComp.composed} on:change={setCurrent}>
					{#each compartmentNames as name}
						<option value={name}>{name}</option>
					{/each}
				</Select>
			</div>
		{:else if selectedType === 'edge-stochastic'}
			<div>
				<Label>Threshold:</Label>
				<Input type="number" bind:value={edgeStochasticComp.treshold} on:input={setCurrent} />
				<Label>Triggering Status:</Label>
				<Input
					type="text"
					bind:value={edgeStochasticComp.triggering_status}
					on:input={setCurrent}
				/>
				<Label>Composed:</Label>
				<Select bind:value={nodeStochasticComp.composed} on:change={setCurrent}>
					{#each compartmentNames as name}
						<option value={name}>{name}</option>
					{/each}
				</Select>
			</div>
		{:else if selectedType === 'count-down'}
			<div>
				<Label>Name:</Label>
				<Input type="text" bind:value={countDownComp.name} on:input={setCurrent} />
				<Label>Iteration Count:</Label>
				<Input type="number" bind:value={countDownComp.iteration_count} on:input={setCurrent} />
			</div>
		{:else if selectedType === 'conditional-composition'}
			<div>
				<Label>Condition:</Label>
				<Select bind:value={conditionalCompositionComp.condition} on:change={setCurrent}>
					{#each compartmentNames as name}
						<option value={name}>{name}</option>
					{/each}
				</Select>
				<Label>First Branch:</Label>
				<Select bind:value={conditionalCompositionComp.first_branch} on:change={setCurrent}>
					{#each compartmentNames as name}
						<option value={name}>{name}</option>
					{/each}
				</Select>
				<Label>Second Branch:</Label>
				<Select bind:value={conditionalCompositionComp.second_branch} on:change={setCurrent}>
					{#each compartmentNames as name}
						<option value={name}>{name}</option>
					{/each}
				</Select>
			</div>
		{/if}
		<Button class="w-full1" on:click={addCompartments}>
			Add compartment<ArrowRightOutline class="ms-2 h-6 w-6" />
		</Button>
	</form>
</Modal>
