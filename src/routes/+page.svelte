<script>
	import { Heading, P, Button, Span, Radio } from 'flowbite-svelte';
	import { Modal, Label, Input, Checkbox } from 'flowbite-svelte';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';

	import { invoke } from '@tauri-apps/api/tauri';
	import { goto } from '$app/navigation';

	import ListProjects from './welcome/ListProjects.svelte';
	import { generateSlug } from '$lib/utils';
	import { nodeOrEdge, project } from '$lib/stores/projects';

	//add project logic here
	let addProjectOpen = false;
	let newProjectName = '';
	let newProjectInfo = '';
	let nodeEdgeSelect = '';

	//called when create project button is clicked in the modal
	function createProject() {
		//save the project info to the store so that it can be accessed in project page
		const newProject = {
			name: newProjectName,
			date: getCurrentDateFormatted(),
			info: newProjectInfo
		};
		console.log(newProject.date);
		project.set(newProject);

		nodeOrEdge.set(nodeEdgeSelect);

		//call python to actually create a project on that side
		run_python_create_project(
			generateSlug(newProject.name),
			newProject.date,
			newProject.info,
			nodeEdgeSelect
		);

		//goto project page
		goto(`/project/${generateSlug(newProjectName)}`);
	}

	async function run_python_create_project(name, date, info, nodeEdgeSelect) {
		try {
			await invoke('run_python_create_project', {
				name: name,
				date: date,
				info: info,
				node_or_edge: nodeEdgeSelect
			});
			console.log('Project creation finished on Python side.');
		} catch (error) {
			console.error('Error creating project:', error);
		} // finally {
		// 	//goto project page
		// 	goto(`/project/${generateSlug(name)}`);
		// }
	}

	function getCurrentDateFormatted() {
		const date = new Date();
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	}
</script>

<div class="container text-center">
	<Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl"
		>Welcome to <Span gradient>Crowd!</Span></Heading
	>
	<P class="my-6 text-center text-lg dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48"
		>Start by creating a new project or continue with an existing one.</P
	>
	<Button on:click={() => (addProjectOpen = true)}>
		Add project
		<ArrowRightOutline class="ms-2 h-6 w-6" />
	</Button>
</div>

<ListProjects />

<Modal bind:open={addProjectOpen} size="xs" autoclose={false} class="w-full">
	<form class="flex flex-col space-y-6">
		<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add project</h3>
		<Label class="space-y-2">
			<span>Enter a name for the new project:</span>
			<Input placeholder="project name" required bind:value={newProjectName} />
		</Label>
		<Label class="space-y-2">
			<span>Add a description of your project:</span>
			<Input
				placeholder="Diffusion of flu virus in a random network"
				required
				bind:value={newProjectInfo}
			/>
		</Label>
		<Label class="space-y-2">
			<span>Project will be:</span>
			<Radio name="node-diffusion" bind:group={nodeEdgeSelect} value="node">Node simulation</Radio>
			<Radio name="edge-diffusion" bind:group={nodeEdgeSelect}>Edge simulation</Radio>
		</Label>
		<Button class="w-full1" on:click={createProject}>
			Create project<ArrowRightOutline class="ms-2 h-6 w-6" />
		</Button>
	</form>
</Modal>
