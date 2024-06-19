<script>
	import {
		Label,
		Select,
		Modal,
		Button,
		Heading,
		A,
		List,
		Li,
		GradientButton
	} from 'flowbite-svelte';
	import {
		ArrowRightOutline,
		CirclePlusSolid,
		ObjectsColumnSolid,
		TrashBinSolid
	} from 'flowbite-svelte-icons';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let compartments = [{ name: 'No compartments created.', content: null }];
	export let nodeTypes = [{ name: 'No nodetypes created yet', weight: 0 }];

	const compartmentNames = compartments.map((compartment) => compartment.name);
	const nodeTypeNames = nodeTypes.map((nodeType) => nodeType.name);
	// Creating a new dictionary with keys and values being the same
	const items = compartmentNames.map((compartmentNamesElement) => ({
		name: compartmentNamesElement,
		value: compartmentNamesElement
	}));

	const type_items = nodeTypeNames.map((typeNamesElement) => ({
		name: typeNamesElement,
		value: typeNamesElement
	}));

	console.log(items);

	let rule1 = '';
	let rule2 = '';
	let rule3 = '';

	let rules = [];

	let addRuleModalOpen = false;
	let ruleId = 0;

	function addRule() {
		ruleId++;
		const ruleName = 'r' + ruleId;
		addRuleModalOpen = false;
		rules = [...rules, { name: ruleName, content: [rule1, rule2, rule3] }];
		rule1 = '';
		rule2 = '';
		rule3 = '';
	}

	function removeRule(name) {
		rules = rules.filter((rule) => rule.name !== name);
	}

	function sendRulesToParent() {
		dispatch('message', { name: 'rules', contents: rules });
	}
</script>

<Heading
	tag="h2"
	customSize="text-md font-semibold"
	class="text-md font-semibold  text-gray-900 dark:text-white">Rules:</Heading
>

<A on:click={() => (addRuleModalOpen = true)} size="sm" class="my-2"
	><CirclePlusSolid class="mr-2 h-4 w-4" /> Add a rule</A
>
<List tag="ul" list="none" class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
	{#each rules as rule}
		<Li class="pb-3 sm:pb-4">
			<div class="flex items-center space-x-4 rtl:space-x-reverse">
				<div class="flex-shrink-0">
					<ObjectsColumnSolid />
				</div>
				<div class="min-w-0 flex-1">
					<p class="truncate text-sm font-medium text-gray-900 dark:text-white">{rule.name}</p>
					<p class="truncate text-sm text-gray-500 dark:text-gray-400">
						Starting state: {rule.content[0]}
					</p>
					<p class="truncate text-sm text-gray-500 dark:text-gray-400">
						State to go: {rule.content[1]}
					</p>
					<p class="truncate text-sm text-gray-500 dark:text-gray-400">
						Compartment to use: {rule.content[2]}
					</p>
				</div>
				<div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
					<A on:click={() => removeRule(rule.name)}><TrashBinSolid /></A>
				</div>
			</div>
		</Li>
	{/each}
</List>
<GradientButton color="purpleToBlue" size="xs" class="mt-2" on:click={sendRulesToParent}
	>Save</GradientButton
>

<Modal bind:open={addRuleModalOpen} size="xs" autoclose={false} class="w-full">
	<form class="flex flex-col space-y-6">
		<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add a rule</h3>
		<div>
			<!-- First instance -->
			<div>
				<Label>
					Current state:
					<Select class="mt-2" items={type_items} bind:value={rule1} />
				</Label>
			</div>

			<!-- Second instance -->
			<div class="my-4">
				<Label>
					State to move:
					<Select class="mt-2" items={type_items} bind:value={rule2} />
				</Label>
			</div>

			<!-- Third instance -->
			<div class="my-4">
				<Label>
					Using the compartment(rule bits):
					<Select class="mt-2" {items} bind:value={rule3} />
				</Label>
			</div>
		</div>

		<Button class="w-full1" on:click={addRule}>
			Add rule<ArrowRightOutline class="ms-2 h-6 w-6" />
		</Button>
	</form>
</Modal>
