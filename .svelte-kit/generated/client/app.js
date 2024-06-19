export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/graph/[slug]": [3],
		"/methodlab": [4],
		"/project/[slug]": [5],
		"/results": [6],
		"/sidebar": [7],
		"/sidebar/crud/products": [8],
		"/sidebar/crud/results": [9],
		"/sidebar/crud/users": [10],
		"/sidebar/dashboard": [11],
		"/sidebar/layouts/sidebar": [12],
		"/sidebar/playground/sidebar": [13],
		"/sidebar/settings": [14],
		"/welcome": [15]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),

	reroute: (() => {})
};

export { default as root } from '../root.svelte';