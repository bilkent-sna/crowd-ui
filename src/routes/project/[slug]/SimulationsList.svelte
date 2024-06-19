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

	import { project, simulationDirectory, simulationName } from '$lib/stores/projects';
	import { generateSlug } from '$lib/utils';

	let allSimulations = [];

	onMount(() => {
		run_python_list_simulations(generateSlug($project.name));
	});

	async function run_python_list_simulations(project_name) {
		try {
			const result = await invoke('run_python_list_simulations', { project_name });
			allSimulations = JSON.parse(result);
		} catch (error) {
			console.error('Error running Python list simulations:', error);
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
				<TableHead>
					<TableHeadCell>Date</TableHeadCell>
					<TableHeadCell>Name</TableHeadCell>
					<TableHeadCell>Epochs</TableHeadCell>
					<TableHeadCell>States</TableHeadCell>
					<TableHeadCell></TableHeadCell>
				</TableHead>
				<TableBody tableBodyClass="divide-y">
					{#each filteredItems as item}
						<TableBodyRow>
							<TableBodyCell>{item.date}</TableBodyCell>
							<TableBodyCell>{item.name}</TableBodyCell>
							<TableBodyCell>{item.epoch_num}</TableBodyCell>
							<TableBodyCell>{item.states}</TableBodyCell>
							<TableBodyCell>
								<a
									href={'/graph/' + generateSlug(item.name)}
									on:click={() => {
										setSimulationDirectory(item.start_time);
										simulationName.set(generateSlug(item.name));
									}}
									class="font-medium text-primary-600 hover:underline dark:text-primary-500">Go</a
								>
							</TableBodyCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</TableSearch>
		</div>
	</div>
{/if}
