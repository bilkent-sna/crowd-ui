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
		GradientButton,
		Modal
	} from 'flowbite-svelte';
	import { ExclamationCircleOutline } from 'flowbite-svelte-icons';
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

	let exploreCheck = false;
	let explorationInfo = {};

	let errorModalOpen = false;
	let latestError = 'error';

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
				fileOrRandom['count'] = parseUserInput(graphGenerateCount, 'count');

			if (graphGenerateType === 'random-regular')
				fileOrRandom['degree'] = parseUserInput(graphGenerateDegree, 'degree');

			if (['barabasi-albert', 'powerlaw-cluster-graph'].includes(graphGenerateType))
				fileOrRandom['m'] = parseUserInput(graphGenerateM, 'm');

			if (
				['watts-strogatz', 'connected-watts-strogatz', 'newman-watts-strogatz'].includes(
					graphGenerateType
				)
			)
				fileOrRandom['k'] = parseUserInput(graphGenerateK, 'k');

			if (
				!['complete-graph', 'barabasi-albert', 'random-regular'].includes(graphGenerateType) &&
				dataSource === 'generate-graph' &&
				graphGenerateType !== ''
			)
				fileOrRandom['p'] = parseUserInput(graphGenerateP, 'p');

			if (graphGenerateType === 'connected-watts-strogatz')
				fileOrRandom['tries'] = parseUserInput(graphGenerateTries, 'tries');
		} else {
			fileOrRandom = 'Error';
		}

		const confInfo = {
			structure: {
				fileOrRandom
			}
		};

		const theMessage = {
			conf: confInfo,
			model_exp: explorationInfo
		};

		const sender = 'dataSource';
		dispatch('message', { name: sender, contents: theMessage });
	}

	function parseUserInput(stringToParse, confSectionName) {
		let separated = stringToParse.split(',');
		const len = separated.length;

		if (len > 1) {
			// Add to model exploration
			explorationInfo['dataSource.' + confSectionName] = {
				path: 'structure.random.' + confSectionName,
				values: separated
			};
			// Return first value to be put to conf
			return parseInt(separated[0]);
		} else if (len === 1) {
			// No model exploration, just return the number
			return parseInt(stringToParse);
		} else if (len < 1) {
			console.log('Error parsing user input in data source.');
			return null;
		}
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
			latestError = error;
			errorModalOpen = true;
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
					latestError = error;
					errorModalOpen = true;
				}
			};
			reader.readAsArrayBuffer(selectedFile);
		}
	}

	//Displaying and getting matrix input for stochastic block model

	// Default matrix size (e.g., 3x3)
	let rows = 3;
	let cols = 3;

	// Matrix data, initialized with empty strings
	let matrix = Array(rows)
		.fill()
		.map(() => Array(cols).fill(''));

	// Function to update matrix cell values
	function updateMatrix(row, col, value) {
		matrix[row][col] = value;
	}

	// Function to handle form submission
	function submitMatrix() {
		console.log('Matrix:', matrix);
		alert(JSON.stringify(matrix)); // Replace this with your logic
	}

	// Dynamically update the matrix when dimensions change
	onMount(() => {
		updateMatrixSize();
	});

	function updateMatrixSize() {
		matrix = Array(rows)
			.fill()
			.map(() => Array(cols).fill(''));
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
								{ value: 'forest-fire', name: 'Forest Fire' },
								{ value: 'stochastic-block', name: 'Stochastic Block' },
								{ value: 'LFR-benchmark', name: 'LFR Benchmark' },
								{ value: 'geometric-random', name: 'Geometric Random' },
								{ value: 'configuration', name: 'Configuration' },
								{ value: 'static-fitness', name: 'Static Fitness' },
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
					{#if graphFileType === 'stochastic-block'}
						<div class="mx-auto max-w-md">
							<h2 class="mb-4 text-xl font-semibold">Matrix Input</h2>

							<!-- Input for Rows and Columns -->
							<div class="mb-4 grid grid-cols-2 gap-4">
								<div>
									<label for="rows" class="block text-sm font-medium text-gray-700">Rows</label>
									<input
										id="rows"
										type="number"
										bind:value={rows}
										on:change={updateMatrixSize}
										class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
									/>
								</div>
								<div>
									<label for="cols" class="block text-sm font-medium text-gray-700">Columns</label>
									<input
										id="cols"
										type="number"
										bind:value={cols}
										on:change={updateMatrixSize}
										class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
									/>
								</div>
							</div>

							<!-- Dynamic Matrix Inputs -->
							<div class="grid gap-2" style="grid-template-columns: repeat({cols}, 1fr);">
								{#each matrix as row, i}
									{#each row as cell, j}
										<input
											type="text"
											bind:value={matrix[i][j]}
											on:input={(e) => updateMatrix(i, j, e.target.value)}
											class="block w-full rounded-md border px-2 py-1 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
										/>
									{/each}
								{/each}
							</div>

							<!-- Submit Button -->
							<button
								on:click={submitMatrix}
								class="mt-4 w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							>
								Submit Matrix
							</button>
						</div>
					{/if}

					<div class="mt-4">
						<Label class="pb-2">Test with different values:</Label>
						<Radio name="explore-radio" bind:group={exploreCheck} value={true}>Yes</Radio>
						<Radio name="explore-radio" bind:group={exploreCheck} value={false}>No</Radio>
						{#if exploreCheck}
							<P class="mt-3 text-sm"
								>Enter values you want to explore separated with a comma in the inputs below.</P
							>
						{/if}
					</div>
					<div class="mb-4 mt-1">
						<Label>
							Node count:
							<Input bind:value={graphGenerateCount} class="mt-2" />
						</Label>
					</div>
					{#if graphGenerateType === 'random-regular'}
						<div class="my-4">
							<Label>
								Degree:
								<Input bind:value={graphGenerateDegree} class="mt-2" />
							</Label>
						</div>
					{/if}
					{#if ['barabasi-albert', 'powerlaw-cluster-graph'].includes(graphGenerateType)}
						<div class="my-4">
							<Label>
								m:
								<Input bind:value={graphGenerateM} class="mt-2" />
							</Label>
						</div>
					{/if}
					{#if ['watts-strogatz', 'connected-watts-strogatz', 'newman-watts-strogatz'].includes(graphGenerateType)}
						<div class="my-4">
							<Label>
								k:
								<Input bind:value={graphGenerateK} class="mt-2" />
							</Label>
						</div>
					{/if}
					{#if !['complete-graph', 'barabasi-albert', 'random-regular'].includes(graphGenerateType) && dataSource === 'generate-graph' && graphGenerateType !== ''}
						<div class="my-4">
							<Label>
								p:
								<Input bind:value={graphGenerateP} class="mt-2" />
							</Label>
						</div>
					{/if}
					{#if graphGenerateType === 'connected-watts-strogatz'}
						<div class="my-4">
							<Label>
								tries:
								<Input bind:value={graphGenerateTries} class="mt-2" />
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

<Modal bind:open={errorModalOpen} size="xs" autoclose>
	<div class="text-center">
		<ExclamationCircleOutline class="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200" />
		<h3 class="mb-1 text-xl font-normal text-gray-800 dark:text-gray-400">Error:</h3>
		<P class="mb-5 text-center text-lg font-normal text-gray-700 dark:text-gray-400"
			>{latestError}</P
		>
		<Button
			color="red"
			class="me-2"
			on:click={() => {
				errorModalOpen = false;
			}}>Try again</Button
		>
	</div>
</Modal>
