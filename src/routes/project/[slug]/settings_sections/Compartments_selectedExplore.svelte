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
		Select,
		Radio,
		P
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

	let exploreCheck = false;
	let explorationInfo = {};

	function sendCompartmentsToParent() {
		const theMessage = {
			conf: compartments,
			model_exp: explorationInfo
		};
		dispatch('message', { name: 'compartments', contents: theMessage });
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

	function parseUserInput(stringToParse, confSectionName) {
		let separated = stringToParse.split(',');
		const len = separated.length;
		confSectionName = 'c' + (compartmentCounter + 1) + '.' + confSectionName;

		if (len > 1) {
			// Add to model exploration
			explorationInfo[confSectionName] = {
				path: 'definitions.pd-model.compartments.' + confSectionName,
				values: separated
			};
			// Return first value to be put to conf
			return separated[0];
		} else if (len === 1) {
			// No model exploration, just return the number
			return stringToParse;
		} else if (len < 1) {
			console.log('Error parsing user input in compartments.');
			return null;
		}
	}

	function addCompartments() {
		compartmentCounter++;
		compartmentName = 'c' + compartmentCounter;
		addCompartmentOpen = false;
		compartments = [...compartments, { name: compartmentName, content: currentCompartment }];
		currentCompartment = null;
	}

	function removeCompartment(name) {
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
					<A on:click={() => removeCompartment(compartment.name)}><TrashBinSolid /></A>
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

		<!-- Model exploration elements for all compartments except conditional composition -->
		{#if selectedType !== 'conditional-composition'}
			<div class="mt-4">
				<Label class="pb-2">Test with different values:</Label>
				<Radio name="explore-radio" bind:group={exploreCheck} value={true}>Yes</Radio>
				<Radio name="explore-radio" bind:group={exploreCheck} value={false}>No</Radio>
				{#if exploreCheck}
					<P class="mt-3 text-sm">
						Enter values you want to explore separated with a comma in the inputs below. See
						documentation to check which sections of compartments can accept multiple values for
						model exploration.
					</P>
				{/if}
			</div>
		{/if}

		{#if selectedType === 'node-stochastic'}
			<div>
				<Label>Ratio:</Label>
				<Input
					type="text"
					value={nodeStochasticComp.ratio}
					on:input={(event) => {
						setCurrent();
						nodeStochasticComp.ratio = event.target.value;
					}}
					on:blur={() => {
						nodeStochasticComp.ratio = parseUserInput(nodeStochasticComp.ratio, 'ratio');
					}}
				/>
				<Label>Triggering Status:</Label>
				<Input
					type="text"
					value={nodeStochasticComp.triggering_status}
					on:input={(event) => {
						setCurrent();
						nodeStochasticComp.triggering_status = event.target.value;
					}}
					on:blur={() => {
						nodeStochasticComp.triggering_status = parseUserInput(
							nodeStochasticComp.triggering_status,
							'triggering_status'
						);
					}}
				/>
			</div>
		{:else if selectedType === 'node-categorical'}
			<div>
				<Label>Value:</Label>
				<Input
					type="text"
					value={nodeCategoricalComp.value}
					on:input={(event) => {
						setCurrent();
						nodeCategoricalComp.value = event.target.value;
					}}
					on:blur={() => {
						nodeCategoricalComp.value = parseUserInput(nodeCategoricalComp.value, 'value');
					}}
				/>
				<Label>Probability:</Label>
				<Input
					type="text"
					value={nodeCategoricalComp.probability}
					on:input={(event) => {
						setCurrent();
						nodeCategoricalComp.probability = event.target.value;
					}}
					on:blur={() => {
						nodeCategoricalComp.probability = parseUserInput(
							nodeCategoricalComp.probability,
							'probability'
						);
					}}
				/>
			</div>
		{:else if selectedType === 'node-numerical-attribute'}
			<div>
				<Label>Value:</Label>
				<Input
					type="text"
					value={nodeNumericalAttrComp.value}
					on:input={(event) => {
						setCurrent();
						nodeNumericalAttrComp.value = event.target.value;
					}}
					on:blur={() => {
						nodeNumericalAttrComp.value = parseUserInput(nodeNumericalAttrComp.value, 'value');
					}}
				/>
				<Label>Probability:</Label>
				<Input
					type="text"
					value={nodeNumericalAttrComp.probability}
					on:input={(event) => {
						setCurrent();
						nodeNumericalAttrComp.probability = event.target.value;
					}}
					on:blur={() => {
						nodeNumericalAttrComp.probability = parseUserInput(
							nodeNumericalAttrComp.probability,
							'probability'
						);
					}}
				/>
			</div>
		{:else if selectedType === 'edge-numerical'}
			<div>
				<Label>Value:</Label>
				<Input
					type="text"
					value={edgeNumericalComp.value}
					on:input={(event) => {
						setCurrent();
						edgeNumericalComp.value = event.target.value;
					}}
					on:blur={() => {
						edgeNumericalComp.value = parseUserInput(edgeNumericalComp.value, 'value');
					}}
				/>
				<Label>Probability:</Label>
				<Input
					type="text"
					value={edgeNumericalComp.probability}
					on:input={(event) => {
						setCurrent();
						edgeNumericalComp.probability = event.target.value;
					}}
					on:blur={() => {
						edgeNumericalComp.probability = parseUserInput(
							edgeNumericalComp.probability,
							'probability'
						);
					}}
				/>
			</div>
		{/if}

		<Button class="w-full1" on:click={addCompartments}>
			Add compartment<ArrowRightOutline class="ms-2 h-6 w-6" />
		</Button>
	</form>
</Modal>
