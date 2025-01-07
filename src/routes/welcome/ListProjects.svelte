<script>
	import { Timeline, TimelineItem, A, Modal, P, Button } from 'flowbite-svelte';
	import { CalendarWeekSolid, ExclamationCircleOutline } from 'flowbite-svelte-icons';

	import { onMount } from 'svelte';
	import { invoke } from '@tauri-apps/api/tauri';

	import { generateSlug } from '$lib/utils';
	import { project, nodeOrEdge } from '$lib/stores/projects';

	let allProjects = [];
	let errorModalOpen = false;
	let latestError = 'error';

	onMount(() => {
		run_python_list_projects();
	});

	async function run_python_list_projects() {
		try {
			const result = await invoke('run_python_list_projects');
			allProjects = JSON.parse(result);

			// Ensure allProjects is an array
			if (!Array.isArray(allProjects)) {
				console.error('Expected an array, but got:', allProjects);
				allProjects = [];
			}

			console.log('Run results to get all lists-->', allProjects);
		} catch (error) {
			console.error('Error running Python list projects:', error);
			latestError = error;
			errorModalOpen = true;
		}
	}
</script>

<div class="flex items-center justify-center">
	<div class="m-5 w-1/2 items-center gap-2 p-1">
		<Timeline order="vertical">
			{#each allProjects as currProject}
				<TimelineItem>
					<svelte:fragment slot="icon">
						<span
							class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-200 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-900"
						>
							<CalendarWeekSolid class="h-4 w-4 text-primary-600 dark:text-primary-400" />
						</span>
					</svelte:fragment>
					<A
						href={`/project/${generateSlug(currProject.name)}`}
						class="font-medium hover:underline"
						on:click={() => {
							project.set({
								name: currProject.name,
								date: currProject.date,
								info: currProject.info
							});
							nodeOrEdge.set(currProject.nodeOrEdge);
						}}
					>
						<!-- <a href="/project/test1" class="font-medium hover:underline"> -->
						{currProject.name}
					</A>
					<div class="text-gray-500 dark:text-gray-400">
						<p class="mb-4 text-base font-normal">{currProject.date}</p>
						<p class="mb-4 text-base font-normal">{currProject.info}</p>
					</div>
				</TimelineItem>
			{/each}
		</Timeline>
	</div>
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
