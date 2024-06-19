<script>
	import {
		NumberInput,
		Radio,
		Label,
		Helper,
		Input,
		Button,
		Select,
		P,
		GradientButton
	} from 'flowbite-svelte';
	import { onMount, createEventDispatcher } from 'svelte';
	import { invoke } from '@tauri-apps/api/tauri';

	import { project } from '$lib/stores/projects';

	const dispatch = createEventDispatcher();

	let dataSource = '';
	$: console.log(dataSource);

	let selectedFile = null;
	let datasetFiles = [];
	let selectedDataset = '';
	let datasetSaveSuccessful = false;

	let graphFileType;
	let hasHeader;
	let graphFileType2;
	let hasHeader2;
	let graphGenerateType;
	let graphGenerateDegree;

	onMount(() => {
		if (dataSource === 'previously-uploaded') {
			loadDatasetFiles();
		}
	});

	function sendConfToParent() {
		let fileOrRandom;
		if (dataSource === 'upload-graph' && selectedFile !== null) {
			fileOrRandom = {
				file: {
					path: 'datasets/' + selectedFile.name,
					type: graphFileType,
					header: hasHeader
				}
			};
		} else if (dataSource === 'previously-uploaded' && selectedDataset !== '') {
			fileOrRandom = {
				file: {
					path: selectedDataset,
					type: graphFileType2,
					header: hasHeader2
				}
			};
		} else if (dataSource === 'generate-graph') {
			fileOrRandom = {
				generateType: graphGenerateType,
				degree: graphGenerateDegree
			};
		} else {
			fileOrRandom = 'Error';
		}

		const theMessage = {
			structure: {
				fileOrRandom
			}
		};

		const sender = 'dataSource';
		dispatch('message', { name: sender, contents: theMessage });
	}

	async function loadDatasetFiles() {
		try {
			if ($project.name !== '') {
				const name = $project.name;
				const result = await invoke('run_python_list_datasets', { project_name: name });
				datasetFiles = JSON.parse(result);
				if (datasetFiles.length === 0) {
					datasetFiles.push('No datasets found. Try upload instead.');
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
</script>

<div>
	<Label class="pb-2">Choose a source for the graph:</Label>
	<Radio name="source-choose" bind:group={dataSource} value="upload-graph">Upload graph</Radio>
	<Radio name="source-choose" bind:group={dataSource} value="generate-graph">Generate graph</Radio>
	<Radio
		name="source-choose"
		bind:group={dataSource}
		value="previously-uploaded"
		on:change={loadDatasetFiles}>Previously uploaded data</Radio
	>

	{#if dataSource === 'upload-graph'}
		<div class="my-4">
			<div class="mx-auto w-2/3">
				<Label class="mb-2 block">Upload File</Label>
				<Input type="file" on:change={handleFileChange} class="w-full" />
				<Helper class="text-sm-gray mt-2">Supported file extensions: CSV, edgelist</Helper>
				<Button on:click={uploadFile} class="mt-4 px-4 py-2">Upload</Button>
				{#if datasetSaveSuccessful}
					<P class="mt-2 text-xs text-green-600">Dataset saved successfully.</P>
				{/if}
				<div class="my-4">
					<Label class="pb-2">The file includes:</Label>
					<Radio name="graph-file-type" bind:group={graphFileType} value="nodes_only"
						>Nodes only</Radio
					>
					<Radio name="graph-file-type" bind:group={graphFileType} value="nodes_edges"
						>Nodes and edges</Radio
					>
				</div>
				<div class="my-4">
					<Label class="pb-2">The file has header:</Label>
					<Radio name="header-choose" bind:group={hasHeader} value="true">Yes</Radio>
					<Radio name="header-choose" bind:group={hasHeader} value="false">No</Radio>
				</div>
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
				<div class="my-4">
					<Label class="pb-2">The file includes:</Label>
					<Radio name="graph-file-type2" bind:group={graphFileType2} value="nodes_only"
						>Nodes only</Radio
					>
					<Radio name="graph-file-type2" bind:group={graphFileType2} value="nodes_edges"
						>Nodes and edges</Radio
					>
				</div>
				<div class="my-4">
					<Label class="pb-2">The file has header:</Label>
					<Radio name="header-choose2" bind:group={hasHeader2} value="true">Yes</Radio>
					<Radio name="header-choose2" bind:group={hasHeader2} value="false">No</Radio>
				</div>
			</div>
		</div>
	{:else if dataSource === 'generate-graph'}
		<div class="my-4">
			<div class="mx-auto w-2/3">
				<div class="my-4">
					<Label>
						Select an option
						<Select
							bind:value={graphGenerateType}
							class="mt-2"
							items={[
								{ value: 'random', name: 'Random' },
								{ value: 'barabasi-albert', name: 'Barabasi-Albert' },
								{ value: 'watts-strogatz', name: 'Watts-Strogatz:' }
							]}
						/>
					</Label>
				</div>
				<div class="my-4">
					<Label>
						Select an option
						<NumberInput bind:value={graphGenerateDegree} class="mt-2" />
					</Label>
				</div>
			</div>
		</div>
	{/if}
	<GradientButton color="purpleToBlue" size="xs" class="mt-2" on:click={sendConfToParent}
		>Save</GradientButton
	>
</div>
