<script>
	import { project } from '$lib/stores/projects';
	import { invoke } from '@tauri-apps/api/tauri';
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
		Helper,
		P,
		Radio
	} from 'flowbite-svelte';
	import {
		ArrowRightOutline,
		CirclePlusSolid,
		ListOutline,
		TrashBinSolid
	} from 'flowbite-svelte-icons';

	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	function sendNetworkParamsToParent() {
		dispatch('message', { name: 'networkParameters', contents: networkParameters });
	}

	let paramName = '';
	let paramValue;
	let addParamOpen = false;
	let paramType = 'string';

	let networkParameters = [];
	$: console.log(networkParameters);

	function addNetworkParam() {
		// Type conversion based on paramType
		let convertedValue;
		if (paramType === 'int') {
			convertedValue = parseInt(paramValue, 10);
		} else if (paramType === 'float') {
			convertedValue = parseFloat(paramValue);
		} else {
			convertedValue = paramValue; // Keep as string if "string" type is selected
		}

		// Add the parameter to the list
		addParamOpen = false;
		networkParameters = [...networkParameters, { [paramName]: convertedValue }];

		// Reset inputs
		paramName = '';
		paramValue = '';
		paramType = 'string';
	}

	function removeNetworkParam(name) {
		networkParameters = networkParameters.filter((param) => !param.hasOwnProperty(name));
	}
</script>

<A on:click={() => (addParamOpen = true)} size="sm" class="my-2"
	><CirclePlusSolid class="mr-2 h-4 w-4" /> Add a network parameter</A
>
<Heading
	tag="h2"
	customSize="text-md font-semibold"
	class="text-md font-semibold  text-gray-900 dark:text-white">Network parameters:</Heading
>
<List tag="ul" list="none" class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
	{#each networkParameters as networkParam}
		<Li class="pb-3 sm:pb-4">
			<div class="flex items-center space-x-4 rtl:space-x-reverse">
				<div class="flex-shrink-0">
					<ListOutline />
				</div>
				<div class="min-w-0 flex-1">
					{#each Object.entries(networkParam) as [key, value]}
						<p class="truncate text-sm font-medium text-gray-900 dark:text-white">
							{key}: {value}
						</p>
					{/each}
				</div>
				<div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
					<A on:click={() => removeNetworkParam(Object.keys(networkParam)[0])}><TrashBinSolid /></A>
				</div>
			</div>
		</Li>
	{/each}
</List>

<GradientButton color="purpleToBlue" size="xs" class="mt-2" on:click={sendNetworkParamsToParent}
	>Save</GradientButton
>

<Modal bind:open={addParamOpen} size="xs" autoclose={false} class="w-full">
	<form class="flex flex-col space-y-6">
		<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add a network parameter</h3>
		<Label class="space-y-2">
			<span>Enter a name for the network parameter:</span>
			<Input placeholder="network parameter name" required bind:value={paramName} />
		</Label>
		<Label class="space-y-2">
			<span>Choose the parameter type:</span>
			<Radio name="type-choose" bind:group={paramType} value="string">String</Radio>
			<Radio name="type-choose" bind:group={paramType} value="int">Integer</Radio>
			<Radio name="type-choose" bind:group={paramType} value="float">Float</Radio>
			<Helper class="text-sm-gray my-2 text-gray-600"
				>For more data types, consider using Crowd library instead.</Helper
			>
		</Label>
		<Label class="space-y-2">
			<span>Enter the value for this parameter:</span>
			<Input placeholder="50" required bind:value={paramValue} />
		</Label>

		<Button class="w-full1" on:click={addNetworkParam}>
			Add network parameter<ArrowRightOutline class="ms-2 h-6 w-6" />
		</Button>
	</form>
</Modal>
