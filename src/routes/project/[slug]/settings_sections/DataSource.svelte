<script>
	// @ts-nocheck

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
	let graphGenerateType = '';
	let graphGenerateDegree;
	let graphGenerateCount;
	let graphGenerateM;
	let graphGenerateP;
	let graphGenerateK;
	let graphGenerateTries;

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
				generateType: graphGenerateType
			};
			if (
				![
					'karate-club-graph',
					'davis-southern-woman',
					'florentine-families',
					'les-miserables'
				].includes(graphGenerateType) &&
				dataSource === 'generate-graph' &&
				graphGenerateType !== ''
			)
				fileOrRandom['count'] = parseInt(graphGenerateCount);

			if (graphGenerateType === 'random-regular')
				fileOrRandom['degree'] = parseInt(graphGenerateDegree);

			if (['barabasi-albert', 'powerlaw-cluster-graph'].includes(graphGenerateType))
				fileOrRandom['m'] = parseInt(graphGenerateM);

			if (
				['watts-strogatz', 'connected-watts-strogatz', 'newman-watts-strogatz'].includes(
					graphGenerateType
				)
			)
				fileOrRandom['k'] = parseInt(graphGenerateK);

			if (
				!['complete-graph', 'barabasi-albert', 'random-regular'].includes(graphGenerateType) &&
				dataSource === 'generate-graph' &&
				graphGenerateType !== ''
			)
				fileOrRandom['p'] = parseInt(graphGenerateP);

			if (graphGenerateType === 'connected-watts-strogatz')
				fileOrRandom['tries'] = parseInt(graphGenerateTries);
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
								{ value: 'random-regular', name: 'Random Regular' },
								{ value: 'erdos-renyi', name: 'Erdos-Renyi' },
								{ value: 'barabasi-albert', name: 'Barabasi-Albert' },
								{ value: 'watts-strogatz', name: 'Watts-Strogatz' },
								{ value: 'connected-watts-strogatz', name: 'Connected Watts-Strogatz' },
								{ value: 'newman-watts-strogatz', name: 'Newman-Watts-Strogatz' },
								{ value: 'powerlaw-cluster-graph', name: 'Powerlaw Cluster' },
								{ value: 'complete-graph', name: 'Complete' },
								{ value: 'karate-club-graph', name: 'Karate Club' },
								{ value: 'davis-southern-woman', name: 'Davis Southern Woman' },
								{ value: 'florentine-families', name: 'Florentine Families' },
								{ value: 'les-miserables', name: 'Les Miserables' }
							]}
						/>
					</Label>
					<Helper class="text-sm-gray mt-2"
						>To learn more about these graph types and their parameters, check NetworkX graph
						generators page.</Helper
					>
				</div>
				{#if !['karate-club-graph', 'davis-southern-woman', 'florentine-families', 'les-miserables'].includes(graphGenerateType) && dataSource === 'generate-graph' && graphGenerateType !== ''}
					<div class="my-4">
						<Label>
							Node count:
							<NumberInput bind:value={graphGenerateCount} class="mt-2" />
						</Label>
					</div>
					{#if graphGenerateType === 'random-regular'}
						<div class="my-4">
							<Label>
								Degree:
								<NumberInput bind:value={graphGenerateDegree} class="mt-2" />
							</Label>
						</div>
					{/if}
					{#if ['barabasi-albert', 'powerlaw-cluster-graph'].includes(graphGenerateType)}
						<div class="my-4">
							<Label>
								m:
								<NumberInput bind:value={graphGenerateM} class="mt-2" />
							</Label>
						</div>
					{/if}
					{#if ['watts-strogatz', 'connected-watts-strogatz', 'newman-watts-strogatz'].includes(graphGenerateType)}
						<div class="my-4">
							<Label>
								k:
								<NumberInput bind:value={graphGenerateK} class="mt-2" />
							</Label>
						</div>
					{/if}
					{#if !['complete-graph', 'barabasi-albert', 'random-regular'].includes(graphGenerateType) && dataSource === 'generate-graph' && graphGenerateType !== ''}
						<div class="my-4">
							<Label>
								p:
								<NumberInput bind:value={graphGenerateP} class="mt-2" />
							</Label>
						</div>
					{/if}
					{#if graphGenerateType === 'connected-watts-strogatz'}
						<div class="my-4">
							<Label>
								tries:
								<NumberInput bind:value={graphGenerateTries} class="mt-2" />
							</Label>
						</div>
					{/if}
				{/if}
			</div>
		</div>
	{/if}
	<GradientButton color="purpleToBlue" size="xs" class="mt-2" on:click={sendConfToParent}
		>Save</GradientButton
	>
</div>
