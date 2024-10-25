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

export const simulationType = writable(''); //is diffusion or other

//if it is a node simulation, node based simulation networks will be instantiated in the backend
//stored in project settings
export const nodeOrEdge = writable('');

// Simulation directory holds the name of the directory, but to get the relevant simulation,
// we should concatenate it with the run number in the following format:
//simulationName/runNumber => 2024-10-23=15-09\1 or 2024-10-23=15-09/1
export const runNumber = writable(1);
