<script>
	import { P, Heading, A, Card, List, Li } from 'flowbite-svelte';

	import { open } from '@tauri-apps/api/shell';
	import {
		AddressBookSolid,
		ArchiveSolid,
		ArrowRightOutline,
		BookOpenSolid,
		GiftBoxSolid,
		GithubSolid,
		LinkOutline
	} from 'flowbite-svelte-icons';

	function openExternalLink(event, url) {
		event.preventDefault(); // Prevent the default in-app navigation
		open(url).catch((error) => console.error('Failed to open URL:', error));
	}
</script>

<div class="items-center text-center">
	<Heading
		tag="h1"
		class="my-4 dark:text-gray-400"
		customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl">Help</Heading
	>
	<P class="mb-4 mt-6 text-center text-lg dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48"
		>Link to all resources.</P
	>
</div>

<div class="flex min-h-screen items-center justify-center">
	<div class="grid max-w-screen-md grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
		<Card>
			<BookOpenSolid class="mx-auto mb-0 h-10 w-10 text-blue-500 dark:text-blue-400" />
			<h5
				class="mb-2 text-center text-2xl font-semibold tracking-tight text-gray-900 dark:text-white"
			>
				Documentation
			</h5>
			<List tag="ul" class="mx-2 mb-8 mt-2 space-y-2 text-gray-500 dark:text-gray-400" list="none">
				<P class="text-gray-500 dark:text-gray-400"
					>While we are preparing the documentation, please check out the examples.
				</P>

				<!-- <Li icon class="gap-1">
					<LinkOutline class="h-5 w-5 text-primary-500 dark:text-primary-400" />
					<a
						href="/"
						on:click={(e) => openExternalLink(e, 'https://v1.tauri.app/v1/api/js/shell/')}
						class="inline-flex items-center hover:underline"
						>Main page
					</a></Li
				> -->
				<!-- <Li icon class="gap-1">
					<LinkOutline class="h-5 w-5 text-primary-500 dark:text-primary-400" />
					<a
						href="/"
						on:click={(e) => openExternalLink(e, 'https://v1.tauri.app/v1/api/js/shell/')}
						class="inline-flex items-center hover:underline"
						>Simulation settings selection
					</a></Li
				>
				<Li icon class="gap-1">
					<LinkOutline class="h-5 w-5 text-primary-500 dark:text-primary-400" />
					<a
						href="/"
						on:click={(e) => openExternalLink(e, 'https://v1.tauri.app/v1/api/js/shell/')}
						class="inline-flex items-center hover:underline">How to write custom methods</a
					></Li
				>
				<Li icon class="gap-1">
					<LinkOutline class="h-5 w-5 text-primary-500 dark:text-primary-400" />
					<a
						href="/"
						on:click={(e) => openExternalLink(e, 'https://v1.tauri.app/v1/api/js/shell/')}
						class="inline-flex items-center hover:underline"
					>
						Batch run and parameter exploration
					</a></Li
				>
				<Li icon class="gap-1">
					<LinkOutline class="h-5 w-5 text-primary-500 dark:text-primary-400" />
					<a
						href="/"
						on:click={(e) => openExternalLink(e, 'https://v1.tauri.app/v1/api/js/shell/')}
						class="inline-flex items-center hover:underline"
						>Data merge
					</a></Li
				>
				<Li icon class="gap-1">
					<LinkOutline class="h-5 w-5 text-primary-500 dark:text-primary-400" />
					<a
						href="/"
						on:click={(e) => openExternalLink(e, 'https://v1.tauri.app/v1/api/js/shell/')}
						class="inline-flex items-center hover:underline"
					>
						Generating charts
					</a></Li
				> -->
			</List>
		</Card>

		<Card>
			<ArchiveSolid class="mx-auto mb-0 h-10 w-10 text-primary-500 dark:text-primary-400" />
			<h5
				class="mb-2 text-center text-2xl font-semibold tracking-tight text-gray-900 dark:text-white"
			>
				Examples
			</h5>
			<List tag="ul" class="mx-2 mb-8 mt-2 space-y-2 text-gray-500 dark:text-gray-400" list="none">
				<Li icon class="gap-1">
					<LinkOutline class="h-5 w-5 text-green-500 dark:text-green-400" />
					<a
						href="https://github.com/Bilkent-Social-Systems-Research-Group/crowd/blob/master/crowd/docs/examples/sir_example/sir.ipynb"
						on:click={(e) =>
							openExternalLink(
								e,
								'https://github.com/Bilkent-Social-Systems-Research-Group/crowd/blob/master/crowd/docs/examples/sir_example/sir.ipynb'
							)}
						class="inline-flex items-center hover:underline">Introduction to Crowd: SIR model</a
					></Li
				>
				<Li icon class="gap-1">
					<LinkOutline class="h-5 w-5 text-green-500 dark:text-green-400" />
					<a
						href="https://github.com/Bilkent-Social-Systems-Research-Group/crowd/tree/master/crowd/docs/examples/generative_epidemic_agents"
						on:click={(e) =>
							openExternalLink(
								e,
								'https://github.com/Bilkent-Social-Systems-Research-Group/crowd/tree/master/crowd/docs/examples/generative_epidemic_agents'
							)}
						class="inline-flex items-center hover:underline"
						>Epidemic simulation with generative agents
					</a></Li
				>
				<Li icon class="gap-1">
					<LinkOutline class="h-5 w-5 text-green-500 dark:text-green-400" />
					<a
						href="https://github.com/Bilkent-Social-Systems-Research-Group/crowd/tree/master/crowd/docs/examples/influence_maximization"
						on:click={(e) =>
							openExternalLink(
								e,
								'https://github.com/Bilkent-Social-Systems-Research-Group/crowd/tree/master/crowd/docs/examples/influence_maximization'
							)}
						class="inline-flex items-center hover:underline">Influence maximization</a
					></Li
				>
				<Li icon class="gap-1">
					<LinkOutline class="h-5 w-5 text-green-500 dark:text-green-400" />
					<a
						href="https://github.com/Bilkent-Social-Systems-Research-Group/crowd/tree/master/crowd/docs/examples/networked_trust_game"
						on:click={(e) =>
							openExternalLink(
								e,
								'https://github.com/Bilkent-Social-Systems-Research-Group/crowd/tree/master/crowd/docs/examples/networked_trust_game'
							)}
						class="inline-flex items-center hover:underline"
					>
						Networked trust game
					</a></Li
				>
				<!-- <Li icon class="gap-1">
					<LinkOutline class="h-5 w-5 text-green-500 dark:text-green-400" />
					<a href="/" class="inline-flex items-center hover:underline">YouTube tutorials</a></Li
				> -->
			</List>
		</Card>

		<Card>
			<GithubSolid class="mx-auto mb-0 h-10 w-10 text-purple-500 dark:text-purple-400" />
			<h5
				class="mb-2 text-center text-2xl font-semibold tracking-tight text-gray-900 dark:text-white"
			>
				GitHub Links
			</h5>
			<List tag="ul" class="mx-2 mb-8 mt-2 space-y-2 text-gray-500 dark:text-gray-400" list="none">
				<Li icon class="gap-1">
					<LinkOutline class="h-5 w-5 text-green-500 dark:text-green-400" />
					<a
						href="https://github.com/Bilkent-Social-Systems-Research-Group/crowd"
						on:click={(e) =>
							openExternalLink(e, 'https://github.com/Bilkent-Social-Systems-Research-Group/crowd')}
						class="inline-flex items-center hover:underline">Crowd Python library</a
					></Li
				>
				<Li icon class="gap-1">
					<LinkOutline class="h-5 w-5 text-green-500 dark:text-green-400" />
					<a
						href="https://github.com/Bilkent-Social-Systems-Research-Group/crowd-ui"
						on:click={(e) =>
							openExternalLink(
								e,
								'https://github.com/Bilkent-Social-Systems-Research-Group/crowd-ui'
							)}
						class="inline-flex items-center hover:underline"
						>Crowd GUI
					</a></Li
				>
				<Li icon class="gap-1">
					<LinkOutline class="h-5 w-5 text-green-500 dark:text-green-400" />
					<a
						href="https://github.com/Bilkent-Social-Systems-Research-Group"
						on:click={(e) =>
							openExternalLink(e, 'https://github.com/Bilkent-Social-Systems-Research-Group')}
						class="inline-flex items-center hover:underline"
						>Bilkent Social Systems Research Group</a
					></Li
				>
			</List>
		</Card>

		<Card>
			<AddressBookSolid class="mx-auto mb-0 h-10 w-10 text-green-500 dark:text-green-400" />
			<h5
				class="mb-2 text-center text-2xl font-semibold tracking-tight text-gray-900 dark:text-white"
			>
				Contact
			</h5>
			<List tag="ul" class="mx-2 mb-8 mt-2 space-y-2 text-gray-500 dark:text-gray-400" list="none">
				<P class="text-gray-500 dark:text-gray-400">If you encounter any problems:</P>
				<Li icon class="gap-1">
					<LinkOutline class="h-5 w-5 text-primary-500 dark:text-primary-400" />
					<a
						href="https://github.com/Bilkent-Social-Systems-Research-Group/crowd/issues"
						on:click={(e) =>
							openExternalLink(
								e,
								'https://github.com/Bilkent-Social-Systems-Research-Group/crowd/issues'
							)}
						class="inline-flex items-center hover:underline">Open an issue on GitHub repo</a
					></Li
				>
				<Li icon class="gap-1">
					<LinkOutline class="h-5 w-5 text-primary-500 dark:text-primary-400" />
					<a
						href="mailto:nedime.rende@bilkent.edu.tr"
						on:click={(e) => openExternalLink(e, 'mailto:crowd@bilkent.edu.tr')}
						class="inline-flex items-center hover:underline">Send an email</a
					></Li
				>
			</List>
		</Card>
	</div>
</div>

<!-- <a
	href="https://v1.tauri.app/v1/api/js/shell/"
	on:click={(e) => openExternalLink(e, 'https://v1.tauri.app/v1/api/js/shell/')}
>
	Open Example
</a> -->
