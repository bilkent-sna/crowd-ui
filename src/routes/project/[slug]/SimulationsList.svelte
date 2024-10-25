<script>
	//This component gets all the recent simulations and displays it in a list format

	import { Button, A } from 'flowbite-svelte';
	import { CirclePlusSolid, CloseCircleSolid } from 'flowbite-svelte-icons';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch
	} from 'flowbite-svelte';

	import { onMount } from 'svelte';
	import { invoke } from '@tauri-apps/api/tauri';

	import { project, simulationDirectory, simulationName, runNumber } from '$lib/stores/projects';
	import { generateSlug } from '$lib/utils';

	let allSimulations = [];
	let subsimulationsInfo = {};

	onMount(async () => {
		await run_python_list_simulations(generateSlug($project.name));
	});

	async function run_python_list_simulations(project_name) {
		try {
			const result = await invoke('run_python_list_simulations', { project_name });
			allSimulations = JSON.parse(result);
		} catch (error) {
			console.error('Error running Python list simulations:', error);
		}
	}

	async function run_python_get_sub_simulations_info(item) {
		let parent_dir_name = getFileName(item.start_time);
		console.log('parent dir:', parent_dir_name, 'project_name', generateSlug($project.name));
		try {
			const result = await invoke('run_python_get_sub_simulations_info', {
				project_name: generateSlug($project.name),
				simulation_directory: parent_dir_name
			});

			// console.log(result);
			//now we have a dictionary in the following format: {sim_no: info_dict}
			subsimulationsInfo = JSON.parse(result);
		} catch (error) {
			console.error('Error running Python get sub simulations info', error);
		}
	}

	let showAllSimulations = false;

	function toggleShow() {
		showAllSimulations = !showAllSimulations;
	}

	let searchTerm = '';

	$: filteredItems = allSimulations.filter(
		(item) => item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
	);

	let openRow = null;

	async function toggleRow(i) {
		if (openRow === i) {
			openRow = null;
		} else {
			await run_python_get_sub_simulations_info(i);
			openRow = i;
		}
	}

	function getFileName(start_time) {
		// Extract the date and time parts
		const [datePart, timePart] = start_time.split(' ');

		// Extract the hours and minutes from the time part
		const [hours, minutes] = timePart.split(':');

		// Format and return the desired string
		return `${datePart}=${hours}-${minutes}`;
	}

	function setSimulationDirectory(start_time) {
		simulationDirectory.set(getFileName(start_time));
	}
</script>

{#if !showAllSimulations}
	<div class="mx-20 my-4">
		<A on:click={toggleShow}><CirclePlusSolid class="h-6 w-6" /> Show all simulations</A>
	</div>
{:else}
	<div class="mx-20 my-4">
		<A on:click={toggleShow}><CloseCircleSolid class="h-6 w-6" />Close all simulations</A>
		<div class="my-2">
			<TableSearch placeholder="Search by name" hoverable={true} bind:inputValue={searchTerm}>
				<TableHead class="bg-indigo-400 text-white">
					<TableHeadCell>Date</TableHeadCell>
					<TableHeadCell>Name</TableHeadCell>
					<TableHeadCell>Epochs</TableHeadCell>
					<TableHeadCell>States</TableHeadCell>
					<TableHeadCell>Batch number</TableHeadCell>
				</TableHead>
				<TableBody tableBodyClass="divide-y">
					{#each filteredItems as item}
						<TableBodyRow
							hoverable={true}
							class="hover:cursor-pointer"
							on:click={() => toggleRow(item)}
						>
							<TableBodyCell>{item.date}</TableBodyCell>
							<TableBodyCell>{item.name.slice(0, -2)}</TableBodyCell>
							<TableBodyCell>{item.epoch_num}</TableBodyCell>
							<TableBodyCell>{item.states}</TableBodyCell>
							<TableBodyCell>{item.child_sim_count}</TableBodyCell>
						</TableBodyRow>

						<!-- Sub-table rendered conditionally -->
						{#if openRow === item}
							<TableBodyRow class="p-0">
								<TableBodyCell colspan="5" class="p-7">
									<div class="overflow-x-auto">
										<Table class="w-full">
											<TableHead class="bg-indigo-100">
												<TableHeadCell>Name</TableHeadCell>
												<TableHeadCell>Start Time</TableHeadCell>
												<TableHeadCell>End Time</TableHeadCell>
												<TableHeadCell>Simulation Duration</TableHeadCell>
												<TableHeadCell></TableHeadCell>
											</TableHead>
											<TableBody>
												{#each Object.entries(subsimulationsInfo) as [subSimID, subSim]}
													<TableBodyRow>
														<TableBodyCell>{subSim.name}</TableBodyCell>
														<TableBodyCell>{subSim.start_time}</TableBodyCell>
														<TableBodyCell>{subSim.end_time}</TableBodyCell>
														<TableBodyCell>{subSim.simulation_duration}</TableBodyCell>
														<TableBodyCell>
															<a
																href={'/graph/' + generateSlug(item.name) + '-' + subSimID}
																on:click={() => {
																	setSimulationDirectory(item.start_time);
																	simulationName.set(generateSlug(item.name.slice(0, -2)));
																	runNumber.set(subSimID);
																}}
																class="font-medium text-primary-600 hover:underline dark:text-primary-500"
															>
																Go
															</a>
														</TableBodyCell>
													</TableBodyRow>
												{/each}
											</TableBody>
										</Table>
									</div>
								</TableBodyCell>
							</TableBodyRow>
						{/if}
					{/each}
				</TableBody>
			</TableSearch>
		</div>
	</div>
{/if}
