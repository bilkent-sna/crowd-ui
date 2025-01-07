<script>
	// @ts-nocheck

	import { Button, Helper, Modal, P, Radio, Select, Label, Hr, A, List, Li } from 'flowbite-svelte';
	import { invoke } from '@tauri-apps/api/tauri';
	import { project, simulationName, simulationDirectory } from '$lib/stores/projects';
	import {
		ChartLineUpOutline,
		TrashBinSolid,
		RulerCombinedOutline,
		LayersOutline,
		CirclePlusSolid,
		ExclamationCircleOutline
	} from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';

	let mergeDataOpen = false;
	let errorModalOpen = false;
	let latestError = 'error';

	const mergeDataToggle = () => {
		mergeDataOpen = !mergeDataOpen;
	};

	let selectedMergeType = '';
	let selectedMergeMethod = '';
	let selectedFile = '';
	let isFileSelected = false;

	let paramFileList = [];
	// A boolean which will set to true when we are loading information from the backend
	// let loadingInformation = true;
	let allSimulationsDict = {};

	onMount(async () => {
		// loadingInformation = true;
		await loadParamFileNames();
		// loadingInformation = false;
	});

	// run whenever file selected changes
	$: {
		console.log('Inside reactive block');
		if (isFileSelected && selectedFile !== '') {
			console.log('Before calling loadParamFile');
			listSimAndCount($project.name);
			// async () => {
			// 	// loadingInformation = true;
			// 	await loadParamFile(selectedFile);
			// 	// loadingInformation = false;
			// };
		}
	}

	async function loadParamFileNames() {
		try {
			let result = await invoke('run_python_list_parameters', {
				project_name: $project.name,
				simulation_directory: $simulationDirectory
			});

			paramFileList = JSON.parse(result);

			console.log('ParamsFileList in JS:', paramFileList);
		} catch (error) {
			console.error('Error occured while loading parameter file names:', error);
			latestError = error;
			errorModalOpen = true;
		}
	}

	async function listSimAndCount(project_name) {
		try {
			const result = await invoke('run_python_list_sim_and_count', { project_name });
			allSimulationsDict = JSON.parse(result);
		} catch (error) {
			console.error('Error running Python list simulations:', error);
			latestError = error;
			errorModalOpen = true;
		}
	}

	function mergeData() {
		mergeDataToggle(); // close the modal
		if (selectedMergeType === 'parentSim') {
			mergeParentSim();
		} else if (selectedMergeType === 'otherSim') {
			mergeOtherSim();
		}
	}

	async function mergeParentSim() {
		try {
			console.log($project.name, $simulationDirectory, selectedFile, selectedMergeMethod);
			await invoke('run_python_merge_parent_sim', {
				project_name: $project.name,
				parent_simulation_dir: $simulationDirectory,
				simulation_dir: '1',
				json_file_name: selectedFile,
				merge_method: selectedMergeMethod
			});
			console.log('Data merged successfully');
		} catch (error) {
			console.error('Error occured while merging data in parent simulation', error);
			latestError = error;
			errorModalOpen = true;
		}
		clearLineData();
	}

	async function mergeOtherSim() {
		try {
			await invoke('run_python_merge_other_sim', {
				project_name: $project.name,
				parent_simulation_dir: $simulationDirectory,
				simulation_dir: '1',
				json_file_name: selectedFile,
				merge_dir_dict: JSON.stringify(simsVars)
			});
			console.log('Data merged successfully');
		} catch (error) {
			console.error('Error occured while merging data with other simulation', error);
			latestError = error;
			errorModalOpen = true;
		}
		clearLineData();
	}

	// Add simulations list to merge logic here
	/* 
		In the other file we had some variables related to y variables/lines logic:
		lines : array of {id: lineId}
		lineId : int - begins with 0
		yDict: dictionary w/ the structure: {"line-1": "Susceptible", "line-2": "Infected"} etc
		yVars: variables chosen, which are the values in yDict

		currLine
		selectedY : init as ''


		We create the equivalent of these in this file:
		Format -> 	currFile : otherFile
					lines: lines
					lineId : lineId
					simsDict : yDict
					simsVars: yVars
					currLine : currLine
					selectedSim : selectedY

	*/

	let lines = [];
	let lineId = 0;
	let currLine;
	let selectedSim = '';
	let simsDict = new Map();
	let simsVars = Array.from(simsDict.values());
	let childSimOptions = [];

	const addLine = () => {
		lines = [...lines, { id: lineId }];
		lineId += 1;
	};

	const removeLine = (id) => {
		lines = lines.filter((line) => line.id !== id);
		removeFromSimList(id);
	};

	function addSimToList(id) {
		selectedSim = document.getElementById('parent-sim-selector-' + id).value;
		if (currLine !== undefined && selectedSim !== '') {
			// add parent simulation to dict and array
			simsDict.set(currLine, selectedSim);
			simsVars = Array.from(simsDict.values());

			// fill the array of child sim options, which is used for the second selector
			let simsCount = allSimulationsDict[selectedSim];
			console.log('simsCount:', simsCount);
			for (let i = 0; i < simsCount; i++) {
				childSimOptions = [...childSimOptions, i + 1];
			}
			console.log('child sim options:', childSimOptions);
		}
	}

	function removeFromSimList(id) {
		let keyToRemove = 'line-' + id;
		simsDict.delete(keyToRemove);
		simsVars = Array.from(simsDict.values());
	}

	function mergeSimName(id) {
		let selectedChildSim = document.getElementById('child-sim-selector-' + id).value;
		if (selectedSim != '') {
			let newName = selectedSim + '/' + selectedChildSim;
			if (currLine !== undefined && selectedChildSim !== '') {
				//update the value of line with the new name: sim_name -> sim_name/1
				simsDict.set(currLine, newName);
				simsVars = Array.from(simsDict.values());
				console.log(simsVars);
			}
		}
	}

	function clearLineData() {
		lines = [];
		lineId = 0;

		selectedFile = '';
		selectedMergeMethod = '';
		currLine = null;
		selectedSim = '';
		simsDict = new Map();

		simsVars = [];
		isFileSelected = false;
	}
</script>

<Button on:click={mergeDataToggle}><LayersOutline class="mr-2" />Merge data</Button>

<Modal bind:open={mergeDataOpen} size="md" title="Merge Data" class="text-left">
	<div>
		<Label class="pb-2"><span class="text-black">Merge type:</span></Label><Radio
			name="mergeType"
			value="parentSim"
			bind:group={selectedMergeType}
			on:change={clearLineData}>Parent simulation</Radio
		>
		<Radio
			name="mergeType"
			value="otherSim"
			bind:group={selectedMergeType}
			on:change={clearLineData}>Other simulation</Radio
		>
	</div>
	{#if selectedMergeType === 'parentSim'}
		<Hr />
		<div class="text-sm text-black">
			Data of all simulations in the parent folder will be merged.
		</div>
		<div>
			<Label class="pb-1" for="method-selector">Select method to merge:</Label>
			<Select id="method-selector" bind:value={selectedMergeMethod}>
				{#each ['mean'] as option}
					<option value={option}>{option}</option>
				{/each}
			</Select>
		</div>
		<div>
			<Label class="pb-1" for="data-from">Merge data from:</Label>
			<Select id="data-from" bind:value={selectedFile} on:input={() => (isFileSelected = true)}>
				{#each paramFileList as option}
					<option value={option}>{option}</option>
				{/each}
			</Select>
		</div>
		<Helper
			>Merged data will be saved as 'xxx_mergeMethod.json'. You can use this data to draw charts or
			further analysis.</Helper
		>
	{:else if selectedMergeType === 'otherSim'}
		<P class="text-sm text-black"
			>Data from selected simulations with the selected file name will be merged.</P
		>
		<div>
			<Label class="pb-1" for="data-from2">Merge data from:</Label>
			<Select id="data-from2" bind:value={selectedFile} on:input={() => (isFileSelected = true)}>
				{#each paramFileList as option}
					<option value={option}>{option}</option>
				{/each}
			</Select>
		</div>
		<div>
			<A on:click={addLine} class="mb-2"
				><CirclePlusSolid class="mr-2 h-4 w-4" />Add simulation to merge</A
			>
			<List
				tag="ul"
				list="none"
				id="add-lines-div"
				class="divide-y divide-gray-200 dark:divide-gray-700"
			>
				{#each lines as line (line.id)}
					<Li>
						<div class="flex items-center space-x-4 py-3 sm:py-4 rtl:space-x-reverse">
							<div class="flex-shrink-0">
								<RulerCombinedOutline />
							</div>
							<div class="w-5/6 min-w-0">
								<div id={`line-${line.id}`} class="my-2">
									<Label class="pb-1" for={`parent-sim-selector-${line.id}`}
										>Parent simulation directory:</Label
									>
									<Select
										id={`parent-sim-selector-${line.id}`}
										on:change={() => {
											currLine = `line-${line.id}`;
											addSimToList(line.id);
										}}
										class="mb-2"
									>
										{#each Object.keys(allSimulationsDict) as option}
											<option value={option}>{option}</option>
										{/each}
									</Select>
									<Label class="pb-1" for={`child-sim-selector-${line.id}`}>Simulation:</Label>
									<Select
										id={`child-sim-selector-${line.id}`}
										on:change={() => {
											currLine = `line-${line.id}`;
											mergeSimName(line.id);
										}}
										class="mb-2"
									>
										{#each childSimOptions as option}
											<option value={option}>{option}</option>
										{/each}
									</Select>
								</div>
							</div>
							<div class="inline-flex items-center">
								<A on:click={() => removeLine(line.id)}><TrashBinSolid /></A>
							</div>
						</div>
					</Li>
				{/each}
			</List>
		</div>
	{/if}
	<div class="mt-4 flex justify-end space-x-2">
		<Button on:click={mergeData}>Merge</Button>
		<Button
			on:click={() => {
				mergeDataToggle();
				clearLineData();
				selectedMergeType = '';
			}}>Cancel</Button
		>
	</div>
</Modal>

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
