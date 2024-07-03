<script>
	// @ts-nocheck

	import { Button, List, Li, Heading, P, Span } from 'flowbite-svelte';
	import fileSaver from 'file-saver';
	import CodeMirrorEditor from 'svelte-codemirror-editor';
	import { python } from '@codemirror/lang-python';
	import { onMount } from 'svelte';
	import { invoke } from '@tauri-apps/api/tauri';
	import { project } from '$lib/stores/projects';

	let code = '';

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
		}
	}

	function handleCodeChange(value) {
		code = value;
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
			<P>After completing the functions, go back to Project or Settings to run the projects.</P>
			<P>
				Here, we should provide user information about which simulation parameters they can use.</P
			>
			<Button class="my-2" on:click={saveMethods}>Save Methods</Button>
			<Button class="my-2" on:click={downloadMethods}>Download Methods</Button>
			<div class="code-editor">
				<CodeMirrorEditor bind:value={code} lang={python()} />
			</div>
		</div>
		<div class="mb-4 w-1/4 px-2">
			<Heading tag="h2" class="mb-3">Info</Heading>

			<Heading
				tag="h2"
				customSize="text-lg font-semibold"
				class="mb-2 text-lg font-semibold text-gray-900 dark:text-white"
				>Implementing custom simulation</Heading
			>
			<List tag="ul" class="space-y-1 text-gray-600 dark:text-gray-400">
				<Li>For the custom simulation, you must implement an <Span>update</Span> method.</Li>
				<Li><Span>Update</Span> method should be placed on top.</Li>
				<Li>This will be the logic that will be called every iteration.</Li>
				<Li>You can call helper methods inside others, including update method.</Li>
				<Li>Update method only takes network as the input (def update(network)).</Li>
				<Li>Network can be passed to other methods as a parameter in the update method.</Li>
				<Li>Return the infected nodes/edges to save them into a separate file.</Li>
			</List>
		</div>
	</div>
</div>

<style>
	.code-editor {
		width: 100%;
		height: 300px;
		font-family: monospace;
		margin-bottom: 20px;
	}
</style>
