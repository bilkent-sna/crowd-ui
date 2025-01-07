<script>
	// @ts-nocheck

	import { Button, Checkbox, Listgroup, ListgroupItem, Heading, P, Modal } from 'flowbite-svelte';
	import { ExclamationCircleOutline } from 'flowbite-svelte-icons';
	import fileSaver from 'file-saver';
	import CodeMirrorEditor from 'svelte-codemirror-editor';
	import { python } from '@codemirror/lang-python';
	import { onMount } from 'svelte';
	import { invoke } from '@tauri-apps/api/tauri';
	import { project } from '$lib/stores/projects';

	let code = '';
	let functions = [];
	let functionSettings = {};

	let errorModalOpen = false;
	let latestError = 'error';

	onMount(async () => {
		await loadMethodsFile();
	});

	async function loadMethodsFile() {
		try {
			const result = await invoke('run_python_load_methods', {
				project_name: $project.name
			});
			code = JSON.parse(result).content;
			console.log(code);
		} catch (error) {
			console.error('Error getting methods from Python:', error);
			latestError = error;
			errorModalOpen = true;
		}
	}

	async function saveMethodsFile() {
		try {
			await invoke('run_python_save_methods', {
				project_name: $project.name,
				code: code
			});
		} catch (error) {
			console.error('Error saving methods with Python', error);
			latestError = error;
			errorModalOpen = true;
		}
	}

	async function saveListView() {
		try {
			await invoke('run_python_save_methods_list_view', {
				project_name: $project.name,
				list_view: JSON.stringify(functionSettings)
			});

			console.log('List view saved successfully');
		} catch (error) {
			console.error('Error saving list view with Python', error);
			latestError = error;
			errorModalOpen = true;
		}
	}

	function extractFunctionNames(code) {
		const regex = /def\s+(\w+)\s*\(/g;
		let match;
		const result = [];
		while ((match = regex.exec(code)) !== null) {
			result.push(match[1]);
		}
		return result;
	}

	function handleCodeChange(value) {
		code = value;
		functions = extractFunctionNames(code);
		functions.forEach((func) => {
			if (!functionSettings[func]) {
				functionSettings[func] = {
					before_iteration: false,
					after_iteration: false,
					after_simulation: false
				};
			}
		});
	}

	function handleCheckboxChange(func, key, value) {
		functionSettings[func][key] = value;
	}

	function saveMethods() {
		handleCodeChange(code);
		console.log('Methods saved', code, functionSettings);
		saveMethodsFile();
	}

	function downloadMethods() {
		const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
		fileSaver(blob, 'methods.py');
	}
</script>

<div class="container mx-auto p-4">
	<div class="-mx-2 flex flex-wrap">
		<div class="mb-4 w-3/4 px-2" style="border-right: 1px solid #cecece;">
			<Heading tag="h2" class="mb-2">Code View</Heading>
			<P>
				Here, we should provide user information about which simulation parameters they can use.
			</P>
			<P class="my-2 text-sm text-gray-500">
				Note: Make sure to save both views before leaving the page if you want them to be used in
				the next simulation.
			</P>
			<Button class="my-2" on:click={saveMethods}>Save Methods</Button>
			<Button class="my-2" on:click={downloadMethods}>Download Methods</Button>
			<div class="code-editor">
				<CodeMirrorEditor bind:value={code} lang={python()} />
			</div>
		</div>
		<div class="mb-4 w-1/4 px-2">
			<Heading tag="h2" class="mb-2">List View</Heading>
			<P>
				Choose when do you want to call each function. If no option is selected, it will not be
				called explicitly. This can be useful in helper methods which you call from other methods.
			</P>

			<Listgroup class="my-4">
				{#each functions as func}
					<ListgroupItem>
						<P><b>{func}</b></P>
						<div class="mt-2">
							<Checkbox
								id="before_iteration_{func}"
								bind:checked={functionSettings[func].before_iteration}
							>
								Before iteration
							</Checkbox>
							<Checkbox
								id="after_iteration_{func}"
								bind:checked={functionSettings[func].after_iteration}
							>
								After iteration
							</Checkbox>
							<Checkbox
								id="after_simulation_{func}"
								bind:checked={functionSettings[func].after_simulation}
							>
								After simulation
							</Checkbox>
						</div>
					</ListgroupItem>
				{/each}
			</Listgroup>
			<Button class="my-2" on:click={saveListView}>Save Choices</Button>
		</div>
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

<style>
	.code-editor {
		width: 100%;
		height: 300px;
		font-family: monospace;
		margin-bottom: 20px;
	}
</style>
