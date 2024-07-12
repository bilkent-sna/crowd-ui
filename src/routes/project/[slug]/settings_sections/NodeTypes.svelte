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
		DrawSquareOutline,
		TrashBinSolid
	} from 'flowbite-svelte-icons';

	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	function sendNodeTypesToParent() {
		dispatch('message', { name: 'nodeTypes', contents: nodeTypes });
	}

	let nodeTypeName = '';
	let nodeTypeWeight;
	let addNodeTypeOpen = false;

	let nodeTypes = [];

	let selectedInit = '';
	let initOptions = [
		{ value: 'random-with-count', name: 'random with count' },
		{ value: 'random-with-weight', name: 'random with weight' },
		{ value: 'choose-with-metric', name: 'choose with metric' },
		{ value: 'from-file', name: 'from file' }
	];

	let nodeCount = 0;
	let selectedMetric = '';
	let metricOptions = [
		{ value: 'degree', name: 'degree centrality' },
		{ value: 'pagerank', name: 'page rank' },
		{ value: 'betweenness', name: 'betweenness centrality' },
		{ value: 'katz', name: 'katz centrality' },
		{ value: 'closeness', name: 'closeness centrality' },
		{ value: 'eigenvector', name: 'eigenvector centrality' }
	];

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

	function addNodeType() {
		addNodeTypeOpen = false;
		let currType = {
			name: nodeTypeName,
			init: selectedInit
		};
		if (selectedInit === 'random-with-count') {
			currType['random-with-count'] = {
				count: nodeCount
			};
		} else if (selectedInit === 'random-with-weight') {
			currType['random-with-weight'] = {
				weight: nodeTypeWeight
			};
		} else if (selectedInit === 'choose-with-metric') {
			currType['choose-with-metric'] = {
				metric: selectedMetric,
				count: nodeCount
			};
		} else if (selectedInit === 'from-file') {
			console.log('selected file:', selectedFile);
			if (dataSource === 'upload-nodes' && selectedFile !== null) {
				currType['from-file'] = {
					path: 'datasets/' + selectedFile.name
				};
			} else if (dataSource === 'previously-uploaded' && selectedDataset !== '') {
				currType['from-file'] = {
					path: selectedDataset
				};
			}
		}
		nodeTypes = [...nodeTypes, currType];
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
					{#each Object.entries(nodetype) as [key, value]}
						{#if key !== 'name'}
							<p class="truncate text-sm text-gray-500 dark:text-gray-400">
								{key}: {JSON.stringify(value)}
							</p>
						{/if}
					{/each}
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
			<span>Choose an initialization method for the node type:</span>
			<Select class="mt-2" items={initOptions} bind:value={selectedInit} />
		</Label>

		{#if selectedInit === 'random-with-count'}
			<Label class="space-y-2">
				<span>Enter the number of nodes you want to create of this node type:</span>
				<Input placeholder="50" required bind:value={nodeCount} />
			</Label>
		{:else if selectedInit === 'random-with-weight'}
			<Label class="space-y-2">
				<span>Set an inital weight between 0 and 1 for this node type:</span>
				<Input placeholder="0.5" required bind:value={nodeTypeWeight} />
			</Label>
		{:else if selectedInit === 'choose-with-metric'}
			<Helper class="text-sm-gray mt-2"
				>These metrics can be used for influence maximization, or in other words, spread of disease
				or information to more nodes.</Helper
			>
			<Label class="space-y-2">
				<span>Select a metric to get k nodes with highest value for this nodetype:</span>
				<Select class="mt-2" items={metricOptions} bind:value={selectedMetric} />
			</Label>
			<Label class="space-y-2">
				<span>Enter the number of nodes you want to create of this node type:</span>
				<Input placeholder="50" required bind:value={nodeCount} />
			</Label>
		{:else if selectedInit === 'from-file'}
			<Label
				>Choose a source for the nodes:
				<Radio name="source-choose" bind:group={dataSource} value="upload-nodes">Upload nodes</Radio
				>
				<Radio
					name="source-choose"
					bind:group={dataSource}
					value="previously-uploaded"
					on:change={loadDatasetFiles}>Previously uploaded data</Radio
				></Label
			>
			{#if dataSource === 'upload-nodes'}
				<div class="my-2">
					<div class="mx-auto">
						<Label class="mb-2 block">Upload File</Label>
						<Helper class="text-sm-gray my-2 text-gray-600"
							>Important: The file should only include the integers representing node IDs. Each
							number should be separated with comma or new line.</Helper
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

		<Button class="w-full1" on:click={addNodeType}>
			Add nodetype<ArrowRightOutline class="ms-2 h-6 w-6" />
		</Button>
	</form>
</Modal>
