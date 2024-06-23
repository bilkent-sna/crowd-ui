<script>
	import { onMount } from 'svelte';
	import { EditorState } from '@codemirror/state';
	import { EditorView, keymap } from '@codemirror/view';
	import { basicSetup } from 'codemirror';
	import { indentWithTab } from '@codemirror/commands';
	import { yaml } from '@codemirror/lang-yaml';
	import { Button, Heading, Input, Label, Modal, P, Span, Spinner } from 'flowbite-svelte';
	import YAML from 'yaml'; // Import the yaml library

	import { invoke } from '@tauri-apps/api/tauri';
	import { project, simulationName, simulationDirectory } from '$lib/stores/projects';
	import { generateSlug } from '$lib/utils';
	import { goto } from '$app/navigation';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';

	let editor;
	let yamlContent = '';
	let nameValue = '';

	let isSimulationRunning = false;
	let runSimOpen = false;
	let epochs = '0';
	let snapshotPeriod = '0';

	onMount(async () => {
		// Load the initial YAML content from the file
		const result = await invoke('run_python_get_conf', {
			project_name: $project.name
		});
		yamlContent = JSON.parse(result);

		console.log(yamlContent);
		// Initialize the CodeMirror editor
		editor = new EditorView({
			state: EditorState.create({
				doc: yamlContent,
				extensions: [basicSetup, yaml(), keymap.of([indentWithTab])]
			}),
			parent: document.querySelector('#editor')
		});
	});

	async function runSimulation() {
		try {
			isSimulationRunning = true;
			let response = await invoke('run_python_init_and_run_simulation', {
				project_name: $project.name,
				epochs: parseInt(epochs),
				snapshot_period: parseInt(snapshotPeriod)
			});
			let simulationDir = JSON.parse(response);
			console.log(
				'Simulation ran successfully and here is the simulation directory:',
				simulationDir
			);

			// Parse editor's content to extract the name value
			parseYamlContent();

			// Set the simulation name and directory stores
			// This will be used in graph and results pages
			simulationDirectory.set(simulationDir);
			simulationName.set(nameValue);

			isSimulationRunning = false;

			// Ensure the simulation_name is correct
			const targetUrl = '/graph/' + generateSlug($simulationName);
			console.log('Navigating to:', targetUrl);

			// Go to the page of visualization of the resulting graph
			goto(targetUrl); // Optionally await to ensure navigation happens
		} catch (error) {
			console.error('Error running simulation:', error);
		}
	}

	function parseYamlContent() {
		try {
			const parsedYaml = YAML.parse(editor.state.doc.toString());
			nameValue = parsedYaml.name || 'Name key not found';
			console.log('Name Value:', nameValue);
		} catch (error) {
			console.error('Error parsing YAML content:', error);
		}
	}

	async function saveYaml() {
		const content = editor.state.doc.toString();
		try {
			// Use tauri function to connect to Python backend and save YAML content
			await invoke('run_python_save_conf', {
				project_name: $project.name,
				content: content
			});
			console.log('Configuration saved successfully');
		} catch (error) {
			console.error('Error saving configuration:', error);
		}
	}

	function downloadYaml() {
		const content = editor.state.doc.toString();
		const blob = new Blob([content], { type: 'application/yaml' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'conf.yaml';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}
</script>

<div class="text-center">
	<Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl">
		Settings
	</Heading>

	<Heading tag="h6">
		Project: <Span gradient>{$project.name}</Span>
	</Heading>
	<P class="my-2 text-center text-gray-600 dark:text-gray-400 sm:px-16 lg:text-lg xl:px-24">
		Put all project settings in a yaml file instead of Projects page
	</P>
</div>
<div class="mx-20 my-10">
	<Button on:click={saveYaml} class="mb-4">Save Configuration</Button>
	<Button on:click={downloadYaml} class="mb-4">Download Configuration</Button>
	{#if isSimulationRunning}
		<Button class="mb-4" on:click={() => (runSimOpen = true)}
			><Spinner type="border" color="white" size="5" />Run Simulation</Button
		>{:else}
		<Button class="mb-4" on:click={() => (runSimOpen = true)}>Run Simulation</Button>{/if}
	<div id="editor"></div>
</div>

<Modal bind:open={runSimOpen} size="xs" autoclose={false} class="w-full">
	<form class="flex flex-col space-y-6">
		<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add project</h3>
		<Label class="space-y-2">
			<span>Number of epochs to run:</span>
			<Input placeholder="Enter an integer" required bind:value={epochs} />
		</Label>
		<Label class="space-y-2">
			<span>Snapshot period:</span>
			<Input placeholder="Enter an integer" required bind:value={snapshotPeriod} />
		</Label>
		<Button class="w-full1" on:click={runSimulation}>
			Run simulation<ArrowRightOutline class="ms-2 h-6 w-6" />
		</Button>
	</form>
</Modal>

<style>
	#editor {
		width: 100%;
		height: 80vh;
		border: 1px solid #ddd;
		margin-bottom: 20px;
	}
</style>
