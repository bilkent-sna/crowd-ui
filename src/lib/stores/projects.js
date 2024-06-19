import { writable } from 'svelte/store';

// Holds basic information about the project and used across almost all pages
// It is updated in the welcome page when user selects a project or creates a new one
export const project = writable({
	name: '',
	date: '',
	info: ''
});

// Not used yet but may be useful
export const yaml_dict = writable({});

// Simulation name will be used in navigation/URLs
export const simulationName = writable('');

// Simulation directory will be used to get data for the current simulation
// from the python side
export const simulationDirectory = writable('');

export const simulationType = writable('');
