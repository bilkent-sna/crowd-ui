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
		GradientButton
	} from 'flowbite-svelte';
	import {
		ArrowRightOutline,
		CirclePlusSolid,
		DrawSquareOutline,
		TrashBinSolid
	} from 'flowbite-svelte-icons';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function sendNodeTypesToParent() {
		dispatch('message', { name: 'nodeTypes', contents: nodeTypes });
	}

	let nodeTypeName = '';
	let nodeTypeWeight;
	let addNodeTypeOpen = false;

	let nodeTypes = [];

	function addNodeType() {
		addNodeTypeOpen = false;
		nodeTypes = [...nodeTypes, { name: nodeTypeName, weight: nodeTypeWeight }];
		nodeTypeName = '';
		nodeTypeWeight = 0;
	}

	function removeNodeType(name) {
		nodeTypes = nodeTypes.filter((nodetype) => nodetype.name !== name);
	}
</script>

<Heading
	tag="h2"
	customSize="text-md font-semibold"
	class="text-md font-semibold  text-gray-900 dark:text-white">Node types:</Heading
>

<A on:click={() => (addNodeTypeOpen = true)} size="sm" class="my-2"
	><CirclePlusSolid class="mr-2 h-4 w-4" /> Add a node type</A
>
<List tag="ul" list="none" class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
	{#each nodeTypes as nodetype}
		<Li class="pb-3 sm:pb-4">
			<div class="flex items-center space-x-4 rtl:space-x-reverse">
				<div class="flex-shrink-0">
					<DrawSquareOutline />
				</div>
				<div class="min-w-0 flex-1">
					<p class="truncate text-sm font-medium text-gray-900 dark:text-white">{nodetype.name}</p>
					<p class="truncate text-sm text-gray-500 dark:text-gray-400">
						Initial weight: {nodetype.weight}
					</p>
				</div>
				<div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
					<A on:click={() => removeNodeType(nodetype.name)}><TrashBinSolid /></A>
				</div>
			</div>
		</Li>
	{/each}
</List>
<GradientButton color="purpleToBlue" size="xs" class="mt-2" on:click={sendNodeTypesToParent}
	>Save</GradientButton
>

<Modal bind:open={addNodeTypeOpen} size="xs" autoclose={false} class="w-full">
	<form class="flex flex-col space-y-6">
		<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add a node type</h3>
		<Label class="space-y-2">
			<span>Enter a name for the node type:</span>
			<Input placeholder="nodetype name" required bind:value={nodeTypeName} />
		</Label>
		<Label class="space-y-2">
			<span>Set an inital weight between 0 and 1 for this node type:</span>
			<Input placeholder="0.5" required bind:value={nodeTypeWeight} />
		</Label>
		<Button class="w-full1" on:click={addNodeType}>
			Add nodetype<ArrowRightOutline class="ms-2 h-6 w-6" />
		</Button>
	</form>
</Modal>
