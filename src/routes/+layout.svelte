<script>
	import '../app.pcss';
	import Navbar from './sidebar/Navbar.svelte';
	// import Sidebar from './sidebar/Sidebar.svelte';
	import Footer from './sidebar/Footer.svelte';
	import { goto } from '$app/navigation';
</script>

<header
	class="sticky top-0 z-40 mx-auto w-full flex-none border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-800"
>
	<Navbar />
</header>
<div class="overflow-hidden lg:flex">
	<!-- <Sidebar /> -->
	<div class="h-full w-full overflow-y-auto">
		<slot />
	</div>
</div>

<!-- <Footer class="bottom-0 mx-auto w-full flex-none" slot="footer" /> -->
