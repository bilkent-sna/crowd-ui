import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$components: path.resolve('./src/components'),
			$data: path.resolve('./src/data'),
			$routes: path.resolve('./src/routes'),
			$lib: path.resolve('./src/lib')
		}
	},
	optimizeDeps: {
		include: [
			'@codemirror/state',
			'@codemirror/view',
			'@codemirror/basic-setup',
			'@codemirror/commands',
			'@codemirror/lang-yaml'
		]
	}
});
