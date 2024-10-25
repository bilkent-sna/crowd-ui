<script>
	// @ts-nocheck

	import { chart } from 'svelte-apexcharts';
	import { Button, Modal, Input, Select, Heading, P, Span, Spinner } from 'flowbite-svelte';
	import { ChartLineUpOutline, TrashBinSolid } from 'flowbite-svelte-icons';

	import { onMount } from 'svelte';
	import { invoke } from '@tauri-apps/api/tauri';
	import { project, simulationName, simulationDirectory } from '$lib/stores/projects';
	import DataMerge from './DataMerge.svelte';

	// A boolean which will set to true when we are loading information from the backend
	let loadingInformation = true;
	let paramFileList = [];

	onMount(async () => {
		loadingInformation = true;
		await loadParamFileNames();
		loadingInformation = false;
	});

	async function loadParamFileNames() {
		try {
			let result = await invoke('run_python_list_parameters', {
				project_name: $project.name,
				simulation_directory: $simulationDirectory
			});

			paramFileList = JSON.parse(result);

			console.log('ParamsFileList in JS:', paramFileList);
		} catch (error) {
			console.error('Error occured while loading parameter file names:', error);
		}
	}

	let axis_opt = [];
	let isFileSelected = false;
	let selectedFile = '';

	let currLine;
	let selectedY = '';
	let yDict = new Map(); // structure: {"line-1": "Susceptible", "line-2": "Infected"} etc

	// these variables will be sent to the chart component
	let data_to_send = null;
	let xVar = ''; // x axis chosen
	let yVars = Array.from(yDict.values()); // variables chosen, which are the values in yDict
	let xTitle;
	let yTitle;
	let chartTitle;

	// run whenever file selected changes
	$: {
		console.log('Inside reactive block');
		if (isFileSelected && selectedFile !== '') {
			console.log('Before calling loadParamFile');
			loadParamFile(selectedFile);
			// async () => {
			// 	// loadingInformation = true;
			// 	await loadParamFile(selectedFile);
			// 	// loadingInformation = false;
			// };
		}
	}

	async function loadParamFile(selectedFile) {
		try {
			console.log('Just got in loadParamFile');
			let result = await invoke('run_python_load_parameter_file', {
				project_name: $project.name,
				simulation_directory: $simulationDirectory,
				file_name: selectedFile
			});

			result = JSON.parse(result);

			console.log('Result in JS: ', result);

			axis_opt = Object.keys(result[0]);
			data_to_send = result;

			console.log('axist_opt in JS:', axis_opt);
			console.log('data to send in JS:', data_to_send);
		} catch (error) {
			console.error('Error occured while loading parameter file names:', error);
		}
	}

	const addYToList = (id) => {
		selectedY = document.getElementById('variable-selector-' + id).value;
		if (currLine !== undefined && selectedY !== '') {
			yDict.set(currLine, selectedY);
			yVars = Array.from(yDict.values());
		}
	};

	const removeFromYList = (id) => {
		let keyToRemove = 'line-' + id;
		yDict.delete(keyToRemove);
		yVars = Array.from(yDict.values());
	};

	// controls for adding chart modal
	let addChartOpen = false;
	$: console.log('Value of addChartOpen:', addChartOpen);

	const addChartToggle = () => {
		console.log('Inside addChartToggle');
		addChartOpen = !addChartOpen;
		clearLineData();
	};

	// clear all the variables we have used to draw the most recent chart
	const clearLineData = () => {
		lines = [];
		lineId = 0;

		axis_opt = [];
		selectedFile = '';
		currLine = null;
		selectedY = '';
		yDict = new Map();

		data_to_send = null;
		xVar = '';
		yVars = [];
		xTitle = '';
		yTitle = '';
		chartTitle = '';
		isFileSelected = false;
	};

	// Add lines logic here
	let lines = [];
	let lineId = 0;

	const addLine = () => {
		lines = [...lines, { id: lineId }];
		lineId += 1;
	};

	const removeLine = (id) => {
		lines = lines.filter((line) => line.id !== id);
		removeFromYList(id);
	};

	// Add charts logic here
	let charts = [];
	let chartId = 0;

	$: console.log(charts);

	const addChart = () => {
		// const chartType = chartTypeSelection === "lineChart" ? "line" : "bar";
		const chartType = chartTypeSelection;

		charts = [
			...charts,
			{
				id: chartId,
				type: chartType,
				options: {
					chart: {
						id: chartId,
						type: chartType,
						width: '100%',
						height: '400px',
						selection: {
							enabled: true
						},
						toolbar: {
							show: true,
							offsetX: 0,
							offsetY: 0,
							tools: {
								download: true,
								selection: false,
								zoom: true,
								zoomin: true,
								zoomout: true,
								pan: true,
								reset: true | '<img src="/static/icons/reset.png" width="20">',
								customIcons: [
									{
										icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="shrink-0 h-5 w-5" role="img" aria-label="trash bin solid" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"></path></svg>',
										index: 4,
										title: 'Delete',
										class: 'custom-icon',
										click: function (chart, options, e) {
											// chart.destroy();
											removeChart(options.config.chart.id);
											// console.log('chart inside func:', chart);
											// console.log('options inside func:', options);
											// console.log('event inside func:', e);
										}
									}
								]
							},
							export: {
								csv: {
									filename: 'chart.csv',
									columnDelimiter: ',',
									headerCategory: 'category',
									headerValue: 'value',
									dateFormatter(timestamp) {
										return new Date(timestamp).toDateString();
									}
								},
								svg: {
									filename: 'chart.svg'
								},
								png: {
									filename: 'chart.png'
								}
							},
							autoSelected: 'zoom'
						}
					},
					series: yVars.map((yVar) => ({
						name: yVar,
						data: data_to_send.map((item) => item[yVar])
					})),
					xaxis: {
						categories: data_to_send.map((item) => item[xVar]),
						title: {
							text: xTitle
						}
						// labels: {
						// 	formatter: function (value) {
						// 		return parseFloat(value).toFixed(2); // Format to 2 decimal places
						// 	}
						// }
					},
					yaxis: {
						title: {
							text: yTitle
						},
						labels: {
							formatter: function (value) {
								return parseFloat(value).toFixed(2); // Format to 2 decimal places
							}
						}
					},
					title: {
						text: chartTitle
					}
				}
			}
		];
		chartId += 1;
		console.log(charts[chartId - 1].options);
		addChartToggle();
	};

	const removeChart = (id) => {
		console.log('id:', id);
		console.log('before', charts);
		charts = charts.filter((chart) => chart.id !== id);
		console.log('after', charts);
	};

	// Helper function to split charts into rows of two
	function chunkArray(array, size) {
		const result = [];
		for (let i = 0; i < array.length; i += size) {
			result.push(array.slice(i, i + size));
		}
		return result;
	}

	let chartTypeSelection;
</script>

{#if loadingInformation}
	<div class="text-center">
		<Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl">
			Results
		</Heading>

		<Heading tag="h6">
			Project: <Span gradient>{$project.name}</Span>
		</Heading>
		<Heading tag="h6" class="mb-4">
			Simulation: <Span gradient>{$simulationName}</Span>
		</Heading>
		<Spinner class="mt-4" size="10" />
		<P class="my-2 text-center text-gray-400 dark:text-gray-400 sm:px-16 lg:text-lg xl:px-24">
			Loading the information
		</P>
	</div>
{:else}
	<div class="text-center">
		<Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl">
			Results
		</Heading>

		<Heading tag="h6">
			Project: <Span gradient>{$project.name}</Span>
		</Heading>
		<Heading tag="h6" class="mb-4">
			Simulation: <Span gradient>{$simulationName}</Span>
		</Heading>

		<p class="mb-4">
			{#if charts.length === 0}
				Start visualizing your results by adding charts.
			{:else}
				Analyze your charts below.
			{/if}
		</p>

		<DataMerge />
		<Button on:click={addChartToggle}><ChartLineUpOutline class="mr-2" /> Add chart</Button>

		<div class="container mx-auto p-4">
			{#each chunkArray(charts, 2) as row}
				<div class="-mx-2 flex flex-wrap">
					{#each row as chart2}
						<div class="mb-4 w-1/2 px-2">
							<div use:chart={chart2.options} />
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</div>
{/if}

<Modal bind:open={addChartOpen} size="md" title="Add Chart">
	<div class="space-y-4">
		<P>Choose type and information for the chart:</P>
		<div>
			<label for="chart-selector">Select chart type:</label>
			<Select id="chart-selector" bind:value={chartTypeSelection}>
				{#each ['line', 'bar', 'area', 'scatter', 'heatmap', 'rangeBar'] as option}
					<option value={option}>{option}</option>
				{/each}
			</Select>
		</div>
		<div>
			<label for="data-type">Select data source:</label>
			<Select id="data-type" bind:value={selectedFile} on:input={() => (isFileSelected = true)}>
				{#each paramFileList as option}
					<option value={option}>{option}</option>
				{/each}
			</Select>
		</div>
		<div>
			<label for="x-variable">Select variable for x-axis:</label>
			<Select id="x-variable" bind:value={xVar}>
				{#each axis_opt as option}
					<option value={option}>{option}</option>
				{/each}
			</Select>
		</div>
		<div>
			<label for="chart-title">Enter title for the chart:</label>
			<Input id="chart-title" bind:value={chartTitle} placeholder="chart title" />
		</div>
		<div>
			<label for="x-title">Enter title for x-axis:</label>
			<Input id="x-title" bind:value={xTitle} placeholder="x-axis" />
		</div>
		<div>
			<label for="y-title">Enter title for y-axis:</label>
			<Input id="y-title" bind:value={yTitle} placeholder="y-axis" />
		</div>
		<div>
			<Button on:click={addLine}>Add variable to chart</Button>
			<div id="add-lines-div">
				{#each lines as line (line.id)}
					<div id={`line-${line.id}`} class="my-2">
						<Select
							id={`variable-selector-${line.id}`}
							on:change={() => {
								currLine = `line-${line.id}`;
								addYToList(line.id);
							}}
						>
							<option value="" disabled selected>Select one</option>
							{#each axis_opt as option}
								<option value={option}>{option}</option>
							{/each}
						</Select>
						<Button size="sm" on:click={() => removeLine(line.id)}>Remove Line</Button>
					</div>
				{/each}
			</div>
		</div>
	</div>
	<div class="mt-4 flex justify-end space-x-2">
		<Button on:click={addChart}>Draw Chart</Button>
		<Button on:click={addChartToggle}>Cancel</Button>
	</div>
</Modal>

<style>
	.mb-4 {
		margin-bottom: 1rem;
	}
	.flex-wrap {
		display: flex;
		flex-wrap: wrap;
	}
	.p-4 {
		padding: 1rem;
	}
</style>
