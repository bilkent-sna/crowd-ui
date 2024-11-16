<script>
	// @ts-nocheck

	//This component gets all the recent simulations and displays it in a list format

	import {
		Button,
		A,
		Accordion,
		AccordionItem,
		GradientButton,
		Helper,
		Input,
		Label,
		Radio,
		Spinner
	} from 'flowbite-svelte';
	import {
		CirclePlusSolid,
		CloseCircleSolid,
		EditSolid,
		DatabaseSolid,
		AdjustmentsHorizontalSolid,
		FileCodeSolid,
		DrawSquareOutline,
		GridPlusSolid,
		ObjectsColumnSolid,
		LinkOutline,
		ListOutline,
		ArrowRightOutline
	} from 'flowbite-svelte-icons';

	import { onMount } from 'svelte';
	import { invoke } from '@tauri-apps/api/tauri';

	import {
		project,
		simulationDirectory,
		simulationName,
		simulationType,
		nodeOrEdge,
		runNumber
	} from '$lib/stores/projects';
	import { generateSlug } from '$lib/utils';
	import { goto } from '$app/navigation';

	import Compartments from './settings_sections/Compartments.svelte';
	import CustomSimulation from './settings_sections/CustomSimulation.svelte';
	import DataSource from './settings_sections/DataSource.svelte';
	import EdgeParameters from './settings_sections/EdgeParameters.svelte';
	import NodeParameters from './settings_sections/NodeParameters.svelte';
	import NodeTypes from './settings_sections/NodeTypes.svelte';
	import Rules from './settings_sections/Rules.svelte';

	let showAllSettings = false;
	let simType = 'false';
	let isDiffusion = true;
	let epochs = 0;
	let snapshotPeriod = 0;
	let batchNumber = 0;

	$: isDiffusion = simType === 'true';
	$: console.log(isDiffusion);
	$: {
		if (isDiffusion) {
			simulationType.set('diffusion');
		} else {
			simulationType.set('other');
		}
	}

	function toggleShow() {
		showAllSettings = !showAllSettings;
	}

	let dataFromChildren = {};
	$: console.log('dict:', dataFromChildren);

	function handleInfoFromChild(event) {
		const childName = event.detail.name;
		const content = event.detail.contents;
		console.log('Name:', childName, 'Content: ', content);

		// Check if model exploration is requested for this component
		if ('model_exp' in content) {
			dataFromChildren[childName] = content.conf;

			// Initialize 'model-exploration' as an object
			if (!('model-exploration' in dataFromChildren)) {
				dataFromChildren['model-exploration'] = {};
			}

			if (Object.keys(content.model_exp).length > 0) {
				// Add or update new exploration selections
				Object.assign(dataFromChildren['model-exploration'], content.model_exp);

				// Remove outdated entries based on keys from content.conf

				for (const key in dataFromChildren['model-exploration']) {
					const splitKey = key.split('.');
					if (childName === splitKey[0]) {
						const baseKey = splitKey[1];
						let existsInConf = true;

						// If conf is array:
						if (Array.isArray(content.conf)) {
							// Check if baseKey exists in any of the objects in content.conf
							existsInConf = content.conf.some((item) => item.name === baseKey);
						} else if (childName === 'dataSource') {
							// If conf is dict
							if (!(baseKey in content.conf['structure']['fileOrRandom'])) {
								existsInConf = false;
							}
						} else if (childName === 'nodeParameters') {
							const arrToCheck = content.conf['numerical'];
							existsInConf = arrToCheck.some((item) => item.name === baseKey);
						}

						// If baseKey is not in content.conf, delete it
						if (!existsInConf) {
							console.log(`Deleting key: ${key}`);
							delete dataFromChildren['model-exploration'][key];
						}
					}
				}
			} else {
				// The content got deleted. Remove all associated entries.
				for (const key in dataFromChildren['model-exploration']) {
					if (key.startsWith(childName + '.')) {
						console.log(`Deleting key due to empty model_exp: ${key}`);
						delete dataFromChildren['model-exploration'][key];
					}
				}
			}
		} else {
			dataFromChildren[childName] = content;
		}
	}

	let simulation_name = '';
	let isSimulationRunning = false;

	function setSimulationName() {
		dataFromChildren['name'] = simulation_name;
	}

	async function sendConfAndRun() {
		try {
			isSimulationRunning = true;
			let response = await invoke('run_python_send_conf_and_run', {
				data: JSON.stringify(dataFromChildren),
				project_name: $project.name,
				epochs: parseInt(epochs),
				snapshot_period: parseInt(snapshotPeriod),
				batch_num: parseInt(batchNumber)
			});
			let simulationDir = JSON.parse(response);
			console.log(
				'Simulation ran successfully and here is the simulation directory:',
				simulationDir
			);
			// Set the simulation name and directory stores
			// This will be used in graph and results pages
			simulationDirectory.set(simulationDir);
			runNumber.set(1);
			simulationName.set(simulation_name);

			isSimulationRunning = false;

			// Ensure the simulation_name is correct
			const targetUrl = '/graph/' + generateSlug(simulation_name);
			console.log('Navigating to:', targetUrl);

			// Go to the page of visualization of the resulting graph
			goto(targetUrl); // Optionally await to ensure navigation happens
		} catch (error) {
			console.error('Error sending data:', error);
		}
	}

	async function runEdgeSimulation() {
		try {
			isSimulationRunning = true;
			let response = await invoke('run_python_edge_conf_run', {
				data: JSON.stringify(dataFromChildren),
				project_name: $project.name,
				epochs: parseInt(epochs),
				snapshot_period: parseInt(snapshotPeriod)
			});
			let simulationDir = JSON.parse(response);
			console.log(
				'Simulation ran successfully and here is the simulation directory:',
				simulationDir
			);
			// Set the simulation name and directory stores
			// This will be used in graph and results pages
			simulationDirectory.set(simulationDir);
			simulationName.set(simulation_name);

			isSimulationRunning = false;

			// Ensure the simulation_name is correct
			const targetUrl = '/graph/' + generateSlug(simulation_name);
			console.log('Navigating to:', targetUrl);

			// Go to the page of visualization of the resulting graph
			goto(targetUrl); // Optionally await to ensure navigation happens
		} catch (error) {
			console.error('Error sending data:', error);
		}
	}

	function runSimulation() {
		console.log('nodeedge', $nodeOrEdge);
		if ($nodeOrEdge === 'node') {
			sendConfAndRun();
		} else if ($nodeOrEdge === 'edge') {
			runEdgeSimulation();
		}
	}
</script>

{#if !showAllSettings}
	<div class="mx-20 my-4">
		<A on:click={toggleShow}><CirclePlusSolid class="h-6 w-6" /> Show simulation settings</A>
	</div>
{:else}
	<div class="mx-20 my-4">
		<A on:click={toggleShow}><CloseCircleSolid class="h-6 w-6" />Close simulation settings</A>
		<div class="my-2">
			<div class="container mx-auto p-4">
				<div class="mx-auto">
					<Accordion>
						<AccordionItem>
							<span slot="header" class="flex gap-2 text-base">
								<EditSolid class="mt-0.5" />
								<span>Simulation basics</span>
							</span>
							<div class="mb-4">
								<Label class="mb-2 block">Simulation name</Label>
								<Input
									id="sim_name"
									required
									placeholder="Changed node type weights to 0.5, 0.3, 0.2"
									class="w-2/3"
									bind:value={simulation_name}
									on:change={setSimulationName}
								/>
								<Helper class="text-sm-gray mt-2">
									Reminder: You can use this name to search for this simulation later.
								</Helper>
							</div>
							<div class="mb-4 mt-2">
								<Label class="mb-2 block">Number of epochs</Label>
								<Input
									id="sim_epochs"
									type="number"
									required
									placeholder="Enter an integer"
									class="w-2/3"
									bind:value={epochs}
								/>
								<Helper class="text-sm-gray mt-2">
									This number indicates how many iterations you will run this simulation for.
								</Helper>
							</div>
							<div class="mb-4 mt-2">
								<Label class="mb-2 block">Snapshot period</Label>
								<Input
									id="sim_snapshot"
									required
									placeholder="Enter an integer"
									class="w-2/3"
									bind:value={snapshotPeriod}
								/>
								<Helper class="text-sm-gray mt-2">
									Simulation data (e.g. graph) will be saved every (snapshot period) number of
									iterations.
								</Helper>
							</div>
							<div class="mb-4 mt-2">
								<Label class="mb-2 block">Batch number</Label>
								<Input
									id="sim_batch"
									required
									placeholder="Enter an integer"
									class="w-2/3"
									bind:value={batchNumber}
								/>
								<Helper class="text-sm-gray mt-2">
									This number indicates how many times you will run this simulation for. By running
									a simulation multiple times and aggregating results, you can solve stochasticity
									issue.
								</Helper>
							</div>
						</AccordionItem>
						<AccordionItem>
							<span slot="header" class="flex gap-2 text-base">
								<DatabaseSolid class="mt-0.5" />
								<span>Data source</span>
							</span>
							<DataSource on:message={handleInfoFromChild} />
						</AccordionItem>
						{#if $nodeOrEdge == 'node'}
							<AccordionItem>
								<span slot="header" class="flex gap-2 text-base">
									<AdjustmentsHorizontalSolid class="mt-0.5" />
									<span>Simulation type</span>
								</span>
								<div>
									<Label class="pb-2">The simulation type will be:</Label>
									<Radio name="simulation-type" bind:group={simType} value="true"
										>Diffusion simulation</Radio
									>
									<!-- <Radio name="simulation-type" bind:group={simType} value="true"
										>Link prediction</Radio
									> -->
									<Radio name="simulation-type" bind:group={simType} value="false">Other</Radio>
								</div>
							</AccordionItem>
						{/if}
						{#if isDiffusion}
							<AccordionItem>
								<span slot="header" class="flex gap-2 text-base">
									<DrawSquareOutline class="mt-0.5" />
									<span>Node types</span>
								</span>
								<NodeTypes on:message={handleInfoFromChild} />
							</AccordionItem>
							<AccordionItem>
								<span slot="header" class="flex gap-2 text-base">
									<ListOutline class="mt-0.5" />
									<span>Node parameters</span>
								</span>
								<NodeParameters on:message={handleInfoFromChild} />
							</AccordionItem>
							<AccordionItem>
								<span slot="header" class="flex gap-2 text-base">
									<LinkOutline class="mt-0.5" />
									<span>Edge parameters</span>
								</span>
								<EdgeParameters on:message={handleInfoFromChild} />
							</AccordionItem>
							<AccordionItem>
								<span slot="header" class="flex gap-2 text-base">
									<GridPlusSolid class="mt-0.5" />
									<span>Compartments</span>
								</span>
								<Compartments on:message={handleInfoFromChild} />
							</AccordionItem>
							<AccordionItem>
								<span slot="header" class="flex gap-2 text-base">
									<ObjectsColumnSolid class="mt-0.5" />
									<span>Rules</span>
								</span>
								<Rules
									on:message={handleInfoFromChild}
									compartments={dataFromChildren['compartments']}
									nodeTypes={dataFromChildren['nodeTypes']}
								/>
							</AccordionItem>
						{:else}
							<AccordionItem>
								<span slot="header" class="flex gap-2 text-base">
									<FileCodeSolid class="mt-0.5" />
									<span>Custom Simulation</span>
								</span>
								<CustomSimulation />
							</AccordionItem>
						{/if}
					</Accordion>
					<div class="text-right">
						{#if isDiffusion}
							{#if isSimulationRunning}
								<GradientButton color="greenToBlue" class="my-4" on:click={runSimulation}>
									<Spinner type="border" color="white" size={5} />Run simulation <ArrowRightOutline
										class="ml-2"
									/>
								</GradientButton>
							{:else}
								<GradientButton color="greenToBlue" class="my-4" on:click={runSimulation}>
									Run simulation <ArrowRightOutline class="ml-2" />
								</GradientButton>
							{/if}
						{:else}
							{#if isSimulationRunning}
								<GradientButton color="greenToBlue" class="mb-1 mt-4">
									<Spinner type="border" size="5" color="white" />Run custom simulation <ArrowRightOutline
										class="ml-2"
									/>
								</GradientButton>
							{:else}
								<GradientButton color="greenToBlue" class="mb-1 mt-4" on:click={runSimulation}>
									Run custom simulation <ArrowRightOutline class="ml-2" />
								</GradientButton>
							{/if}
							<Helper class="text-sm-gray text-gray-500">
								Reminder: Only run the simulation after completing required methods in Method Lab.
							</Helper>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
