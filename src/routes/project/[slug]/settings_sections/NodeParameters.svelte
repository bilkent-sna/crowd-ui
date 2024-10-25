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
		Helper,
		Select,
		P
	} from 'flowbite-svelte';
	import {
		ArrowRightOutline,
		CirclePlusSolid,
		ListOutline,
		TrashBinSolid
	} from 'flowbite-svelte-icons';

	import { createEventDispatcher, onMount } from 'svelte';
	import { project } from '$lib/stores/projects';
	import { invoke } from '@tauri-apps/api/tauri';

	const dispatch = createEventDispatcher();

	function sendNodeParametersToParent() {
		dispatch('message', { name: 'nodeParameters', contents: nodeParameters });
	}

	let nodeParameterName = '';
	let numericalRange1;
	let numericalRange2;
	let addNodeParameterOpen = false;
	let chosenType;
	let chosenInit;

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

	// source file for category options part
	let dataSource = '';
	$: console.log(dataSource);

	let selectedFile = null;
	let datasetFiles = [];
	let selectedDataset = '';
	let datasetSaveSuccessful = false;

	onMount(() => {
		if (dataSource === 'previously-uploaded') {
			loadDatasetFiles();
		}
	});

	async function loadDatasetFiles() {
		try {
			if ($project.name !== '') {
				const name = $project.name;
				const result = await invoke('run_python_list_datasets', { project_name: name });
				datasetFiles = JSON.parse(result);
				if (datasetFiles.length === 0) {
					datasetFiles[0] = 'No datasets found. Try upload instead.';
				}
			} else {
				console.log('Project name empty. Cannot load dataset files');
			}
		} catch (error) {
			console.error('Error loading dataset files:', error);
		}
	}

	function handleFileChange(event) {
		datasetSaveSuccessful = false;
		selectedFile = event.target.files[0];
	}

	async function uploadFile() {
		if (selectedFile) {
			const reader = new FileReader();
			reader.onload = async () => {
				const arrayBuffer = reader.result;
				const fileContent = new Uint8Array(arrayBuffer);

				try {
					await invoke('run_python_save_dataset', {
						project_name: $project.name,
						file_name: selectedFile.name,
						file_content: Array.from(fileContent)
					});
					console.log('File uploaded successfully');
					datasetSaveSuccessful = true;
				} catch (error) {
					console.error('Error uploading file:', error);
				}
			};
			reader.readAsArrayBuffer(selectedFile);
		}
	}

	function addNodeCategorical() {
		addNodeParameterOpen = false;
		if (chosenInit === 'from-list') {
			categoryOptions = optionsString.split(',').map((item) => item.trim());
		} else if (
			chosenInit === 'from-file' &&
			dataSource === 'upload-options' &&
			selectedFile !== null
		) {
			// categoryOptions = 'datasets/' + selectedFile.name;
			categoryOptions = selectedFile.name;
		} else if (
			chosenInit === 'from-file' &&
			dataSource === 'previously-uploaded' &&
			selectedDataset !== ''
		) {
			categoryOptions = selectedDataset;
		}
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
			<Input placeholder="age" required bind:value={nodeParameterName} />
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
				<span>Choose an initialization method for the parameter:</span>
				<Radio name="cat-init-choose" bind:group={chosenInit} value="from-list"
					>Enter the options</Radio
				>
				<Radio name="cat-init-choose" bind:group={chosenInit} value="from-file"
					>Load from file</Radio
				></Label
			>
			{#if chosenInit === 'from-list'}
				<Label class="space-y-2">
					<span>Enter the options in the category, separated by a comma:</span>
					<Input placeholder="male, female" required bind:value={optionsString} />
				</Label>
			{:else if chosenInit === 'from-file'}
				<Label
					>Choose a source for the category options:
					<Radio name="source-choose" bind:group={dataSource} value="upload-options"
						>Upload options</Radio
					>
					<Radio
						name="source-choose"
						bind:group={dataSource}
						value="previously-uploaded"
						on:change={loadDatasetFiles}>Previously uploaded data</Radio
					></Label
				>
				{#if dataSource === 'upload-options'}
					<div class="my-2">
						<div class="mx-auto">
							<Label class="mb-2 block">Upload File</Label>
							<Helper class="text-sm-gray my-2 text-gray-600"
								>Important: The file should only include the name of the options. Each option should
								be separated with comma or new line.</Helper
							>
							<Input type="file" on:change={handleFileChange} class="w-full" />
							<Helper class="text-sm-gray mt-1">Supported file extensions: CSV</Helper>
							<Button on:click={uploadFile} class="mt-4 px-4 py-2">Upload</Button>
							{#if datasetSaveSuccessful}
								<P class="mt-2 text-xs text-green-600">Data saved successfully.</P>
							{/if}
						</div>
					</div>
				{:else if dataSource === 'previously-uploaded'}
					<div class="my-4">
						<div class="mx-auto w-2/3">
							<Label class="mb-2 block">Select Dataset</Label>
							<Select bind:value={selectedDataset} class="w-full">
								{#each datasetFiles as file}
									<option>{file}</option>
								{/each}
							</Select>
							<Helper class="text-sm-gray mt-2">Select a previously uploaded dataset.</Helper>
						</div>
					</div>
				{/if}
			{/if}
			<Button class="w-full1" on:click={addNodeCategorical}>
				Add node parameter<ArrowRightOutline class="ms-2 h-6 w-6" />
			</Button>
		{/if}
	</form>
</Modal>
