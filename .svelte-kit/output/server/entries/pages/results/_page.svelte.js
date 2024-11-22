import { c as create_ssr_component, a as compute_rest_props, b as spread, d as escape_object, e as escape_attribute_value, j as escape, k as each, f as add_attribute, h as subscribe, v as validate_component } from "../../../chunks/ssr.js";
import "apexcharts";
import { B as Button } from "../../../chunks/Button.js";
import { I as Input } from "../../../chunks/Input.js";
import { twMerge } from "tailwind-merge";
import { M as Modal } from "../../../chunks/Modal.js";
import { S as Spinner } from "../../../chunks/Spinner.js";
import { H as Heading, S as Span } from "../../../chunks/Span.js";
import { P } from "../../../chunks/P.js";
import "@tauri-apps/api/core";
import { a as simulationDirectory, p as project, s as simulationName } from "../../../chunks/projects.js";
const common = "block w-full";
const Select = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "items",
    "value",
    "placeholder",
    "underline",
    "size",
    "defaultClass",
    "underlineClass"
  ]);
  let { items = [] } = $$props;
  let { value = void 0 } = $$props;
  let { placeholder = "Choose option ..." } = $$props;
  let { underline = false } = $$props;
  let { size = "md" } = $$props;
  let { defaultClass = "text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" } = $$props;
  let { underlineClass = "text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer" } = $$props;
  const sizes = {
    sm: "text-sm p-2",
    md: "text-sm p-2.5",
    lg: "text-base py-3 px-4"
  };
  let selectClass;
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.underline === void 0 && $$bindings.underline && underline !== void 0)
    $$bindings.underline(underline);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.defaultClass === void 0 && $$bindings.defaultClass && defaultClass !== void 0)
    $$bindings.defaultClass(defaultClass);
  if ($$props.underlineClass === void 0 && $$bindings.underlineClass && underlineClass !== void 0)
    $$bindings.underlineClass(underlineClass);
  selectClass = twMerge(common, underline ? underlineClass : defaultClass, sizes[size], underline && "!px-0", $$props.class);
  return `<select${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(selectClass)
      }
    ],
    {}
  )}>${placeholder ? `<option disabled selected value="">${escape(placeholder)}</option>` : ``}${items.length ? each(items, ({ value: value2, name }) => {
    return `<option${add_attribute("value", value2, 0)}>${escape(name)}</option>`;
  }) : `${slots.default ? slots.default({}) : ``}`}</select> `;
});
const css = {
  code: ".mb-4.svelte-ai22m8{margin-bottom:1rem}.flex-wrap.svelte-ai22m8{display:flex;flex-wrap:wrap}.p-4.svelte-ai22m8{padding:1rem}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\r\\n\\t// @ts-nocheck\\r\\n\\r\\n\\timport { chart } from 'svelte-apexcharts';\\r\\n\\timport { Button, Modal, Input, Select, Heading, P, Span, Spinner } from 'flowbite-svelte';\\r\\n\\timport { ChartLineUpOutline, TrashBinSolid } from 'flowbite-svelte-icons';\\r\\n\\r\\n\\timport { onMount } from 'svelte';\\r\\n\\t//import { invoke } from '@tauri-apps/api/core';\\r\\n\\timport { invoke } from '@tauri-apps/api/core';\\r\\n\\timport { project, simulationName, simulationDirectory } from '$lib/stores/projects';\\r\\n\\timport DataMerge from './DataMerge.svelte';\\r\\n\\r\\n\\t// A boolean which will set to true when we are loading information from the backend\\r\\n\\tlet loadingInformation = true;\\r\\n\\tlet paramFileList = [];\\r\\n\\r\\n\\tonMount(async () => {\\r\\n\\t\\tloadingInformation = true;\\r\\n\\t\\tawait loadParamFileNames();\\r\\n\\t\\tloadingInformation = false;\\r\\n\\t});\\r\\n\\r\\n\\tasync function loadParamFileNames() {\\r\\n\\t\\ttry {\\r\\n\\t\\t\\tlet result = await invoke('run_python_list_parameters', {\\r\\n\\t\\t\\t\\tproject_name: $project.name,\\r\\n\\t\\t\\t\\tsimulation_directory: $simulationDirectory\\r\\n\\t\\t\\t});\\r\\n\\r\\n\\t\\t\\tparamFileList = JSON.parse(result);\\r\\n\\r\\n\\t\\t\\tconsole.log('ParamsFileList in JS:', paramFileList);\\r\\n\\t\\t} catch (error) {\\r\\n\\t\\t\\tconsole.error('Error occured while loading parameter file names:', error);\\r\\n\\t\\t}\\r\\n\\t}\\r\\n\\r\\n\\tlet axis_opt = [];\\r\\n\\tlet isFileSelected = false;\\r\\n\\tlet selectedFile = '';\\r\\n\\r\\n\\tlet currLine;\\r\\n\\tlet selectedY = '';\\r\\n\\tlet yDict = new Map(); // structure: {\\"line-1\\": \\"Susceptible\\", \\"line-2\\": \\"Infected\\"} etc\\r\\n\\r\\n\\t// these variables will be sent to the chart component\\r\\n\\tlet data_to_send = null;\\r\\n\\tlet xVar = ''; // x axis chosen\\r\\n\\tlet yVars = Array.from(yDict.values()); // variables chosen, which are the values in yDict\\r\\n\\tlet xTitle;\\r\\n\\tlet yTitle;\\r\\n\\tlet chartTitle;\\r\\n\\r\\n\\t// run whenever file selected changes\\r\\n\\t$: {\\r\\n\\t\\tconsole.log('Inside reactive block');\\r\\n\\t\\tif (isFileSelected && selectedFile !== '') {\\r\\n\\t\\t\\tconsole.log('Before calling loadParamFile');\\r\\n\\t\\t\\tloadParamFile(selectedFile);\\r\\n\\t\\t\\t// async () => {\\r\\n\\t\\t\\t// \\t// loadingInformation = true;\\r\\n\\t\\t\\t// \\tawait loadParamFile(selectedFile);\\r\\n\\t\\t\\t// \\t// loadingInformation = false;\\r\\n\\t\\t\\t// };\\r\\n\\t\\t}\\r\\n\\t}\\r\\n\\r\\n\\tasync function loadParamFile(selectedFile) {\\r\\n\\t\\ttry {\\r\\n\\t\\t\\tconsole.log('Just got in loadParamFile');\\r\\n\\t\\t\\tlet result = await invoke('run_python_load_parameter_file', {\\r\\n\\t\\t\\t\\tproject_name: $project.name,\\r\\n\\t\\t\\t\\tsimulation_directory: $simulationDirectory,\\r\\n\\t\\t\\t\\tfile_name: selectedFile\\r\\n\\t\\t\\t});\\r\\n\\r\\n\\t\\t\\tresult = JSON.parse(result);\\r\\n\\r\\n\\t\\t\\tconsole.log('Result in JS: ', result);\\r\\n\\r\\n\\t\\t\\taxis_opt = Object.keys(result[0]);\\r\\n\\t\\t\\tdata_to_send = result;\\r\\n\\r\\n\\t\\t\\tconsole.log('axist_opt in JS:', axis_opt);\\r\\n\\t\\t\\tconsole.log('data to send in JS:', data_to_send);\\r\\n\\t\\t} catch (error) {\\r\\n\\t\\t\\tconsole.error('Error occured while loading parameter file names:', error);\\r\\n\\t\\t}\\r\\n\\t}\\r\\n\\r\\n\\tconst addYToList = (id) => {\\r\\n\\t\\tselectedY = document.getElementById('variable-selector-' + id).value;\\r\\n\\t\\tif (currLine !== undefined && selectedY !== '') {\\r\\n\\t\\t\\tyDict.set(currLine, selectedY);\\r\\n\\t\\t\\tyVars = Array.from(yDict.values());\\r\\n\\t\\t}\\r\\n\\t};\\r\\n\\r\\n\\tconst removeFromYList = (id) => {\\r\\n\\t\\tlet keyToRemove = 'line-' + id;\\r\\n\\t\\tyDict.delete(keyToRemove);\\r\\n\\t\\tyVars = Array.from(yDict.values());\\r\\n\\t};\\r\\n\\r\\n\\t// controls for adding chart modal\\r\\n\\tlet addChartOpen = false;\\r\\n\\t$: console.log('Value of addChartOpen:', addChartOpen);\\r\\n\\r\\n\\tconst addChartToggle = () => {\\r\\n\\t\\tconsole.log('Inside addChartToggle');\\r\\n\\t\\taddChartOpen = !addChartOpen;\\r\\n\\t\\tclearLineData();\\r\\n\\t};\\r\\n\\r\\n\\t// clear all the variables we have used to draw the most recent chart\\r\\n\\tconst clearLineData = () => {\\r\\n\\t\\tlines = [];\\r\\n\\t\\tlineId = 0;\\r\\n\\r\\n\\t\\taxis_opt = [];\\r\\n\\t\\tselectedFile = '';\\r\\n\\t\\tcurrLine = null;\\r\\n\\t\\tselectedY = '';\\r\\n\\t\\tyDict = new Map();\\r\\n\\r\\n\\t\\tdata_to_send = null;\\r\\n\\t\\txVar = '';\\r\\n\\t\\tyVars = [];\\r\\n\\t\\txTitle = '';\\r\\n\\t\\tyTitle = '';\\r\\n\\t\\tchartTitle = '';\\r\\n\\t\\tisFileSelected = false;\\r\\n\\t};\\r\\n\\r\\n\\t// Add lines logic here\\r\\n\\tlet lines = [];\\r\\n\\tlet lineId = 0;\\r\\n\\r\\n\\tconst addLine = () => {\\r\\n\\t\\tlines = [...lines, { id: lineId }];\\r\\n\\t\\tlineId += 1;\\r\\n\\t};\\r\\n\\r\\n\\tconst removeLine = (id) => {\\r\\n\\t\\tlines = lines.filter((line) => line.id !== id);\\r\\n\\t\\tremoveFromYList(id);\\r\\n\\t};\\r\\n\\r\\n\\t// Add charts logic here\\r\\n\\tlet charts = [];\\r\\n\\tlet chartId = 0;\\r\\n\\r\\n\\t$: console.log(charts);\\r\\n\\r\\n\\tconst addChart = () => {\\r\\n\\t\\t// const chartType = chartTypeSelection === \\"lineChart\\" ? \\"line\\" : \\"bar\\";\\r\\n\\t\\tconst chartType = chartTypeSelection;\\r\\n\\r\\n\\t\\tcharts = [\\r\\n\\t\\t\\t...charts,\\r\\n\\t\\t\\t{\\r\\n\\t\\t\\t\\tid: chartId,\\r\\n\\t\\t\\t\\ttype: chartType,\\r\\n\\t\\t\\t\\toptions: {\\r\\n\\t\\t\\t\\t\\tchart: {\\r\\n\\t\\t\\t\\t\\t\\tid: chartId,\\r\\n\\t\\t\\t\\t\\t\\ttype: chartType,\\r\\n\\t\\t\\t\\t\\t\\twidth: '100%',\\r\\n\\t\\t\\t\\t\\t\\theight: '400px',\\r\\n\\t\\t\\t\\t\\t\\tselection: {\\r\\n\\t\\t\\t\\t\\t\\t\\tenabled: true\\r\\n\\t\\t\\t\\t\\t\\t},\\r\\n\\t\\t\\t\\t\\t\\ttoolbar: {\\r\\n\\t\\t\\t\\t\\t\\t\\tshow: true,\\r\\n\\t\\t\\t\\t\\t\\t\\toffsetX: 0,\\r\\n\\t\\t\\t\\t\\t\\t\\toffsetY: 0,\\r\\n\\t\\t\\t\\t\\t\\t\\ttools: {\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tdownload: true,\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tselection: false,\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tzoom: true,\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tzoomin: true,\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tzoomout: true,\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tpan: true,\\r\\n\\t\\t\\t\\t\\t\\t\\t\\treset: true | '<img src=\\"/static/icons/reset.png\\" width=\\"20\\">',\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tcustomIcons: [\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\ticon: '<svg xmlns=\\"http://www.w3.org/2000/svg\\" fill=\\"currentColor\\" class=\\"shrink-0 h-5 w-5\\" role=\\"img\\" aria-label=\\"trash bin solid\\" viewBox=\\"0 0 24 24\\"><path fill-rule=\\"evenodd\\" d=\\"M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z\\" clip-rule=\\"evenodd\\"></path></svg>',\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tindex: 4,\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\ttitle: 'Delete',\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass: 'custom-icon',\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclick: function (chart, options, e) {\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t// chart.destroy();\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tremoveChart(options.config.chart.id);\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t// console.log('chart inside func:', chart);\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t// console.log('options inside func:', options);\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t// console.log('event inside func:', e);\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t]\\r\\n\\t\\t\\t\\t\\t\\t\\t},\\r\\n\\t\\t\\t\\t\\t\\t\\texport: {\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tcsv: {\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tfilename: 'chart.csv',\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tcolumnDelimiter: ',',\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\theaderCategory: 'category',\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\theaderValue: 'value',\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tdateFormatter(timestamp) {\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\treturn new Date(timestamp).toDateString();\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t},\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tsvg: {\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tfilename: 'chart.svg'\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t},\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tpng: {\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tfilename: 'chart.png'\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t}\\r\\n\\t\\t\\t\\t\\t\\t\\t},\\r\\n\\t\\t\\t\\t\\t\\t\\tautoSelected: 'zoom'\\r\\n\\t\\t\\t\\t\\t\\t}\\r\\n\\t\\t\\t\\t\\t},\\r\\n\\t\\t\\t\\t\\tseries: yVars.map((yVar) => ({\\r\\n\\t\\t\\t\\t\\t\\tname: yVar,\\r\\n\\t\\t\\t\\t\\t\\tdata: data_to_send.map((item) => item[yVar])\\r\\n\\t\\t\\t\\t\\t})),\\r\\n\\t\\t\\t\\t\\txaxis: {\\r\\n\\t\\t\\t\\t\\t\\tcategories: data_to_send.map((item) => item[xVar]),\\r\\n\\t\\t\\t\\t\\t\\ttitle: {\\r\\n\\t\\t\\t\\t\\t\\t\\ttext: xTitle\\r\\n\\t\\t\\t\\t\\t\\t}\\r\\n\\t\\t\\t\\t\\t\\t// labels: {\\r\\n\\t\\t\\t\\t\\t\\t// \\tformatter: function (value) {\\r\\n\\t\\t\\t\\t\\t\\t// \\t\\treturn parseFloat(value).toFixed(2); // Format to 2 decimal places\\r\\n\\t\\t\\t\\t\\t\\t// \\t}\\r\\n\\t\\t\\t\\t\\t\\t// }\\r\\n\\t\\t\\t\\t\\t},\\r\\n\\t\\t\\t\\t\\tyaxis: {\\r\\n\\t\\t\\t\\t\\t\\ttitle: {\\r\\n\\t\\t\\t\\t\\t\\t\\ttext: yTitle\\r\\n\\t\\t\\t\\t\\t\\t},\\r\\n\\t\\t\\t\\t\\t\\tlabels: {\\r\\n\\t\\t\\t\\t\\t\\t\\tformatter: function (value) {\\r\\n\\t\\t\\t\\t\\t\\t\\t\\treturn parseFloat(value).toFixed(2); // Format to 2 decimal places\\r\\n\\t\\t\\t\\t\\t\\t\\t}\\r\\n\\t\\t\\t\\t\\t\\t}\\r\\n\\t\\t\\t\\t\\t},\\r\\n\\t\\t\\t\\t\\ttitle: {\\r\\n\\t\\t\\t\\t\\t\\ttext: chartTitle\\r\\n\\t\\t\\t\\t\\t}\\r\\n\\t\\t\\t\\t}\\r\\n\\t\\t\\t}\\r\\n\\t\\t];\\r\\n\\t\\tchartId += 1;\\r\\n\\t\\tconsole.log(charts[chartId - 1].options);\\r\\n\\t\\taddChartToggle();\\r\\n\\t};\\r\\n\\r\\n\\tconst removeChart = (id) => {\\r\\n\\t\\tconsole.log('id:', id);\\r\\n\\t\\tconsole.log('before', charts);\\r\\n\\t\\tcharts = charts.filter((chart) => chart.id !== id);\\r\\n\\t\\tconsole.log('after', charts);\\r\\n\\t};\\r\\n\\r\\n\\t// Helper function to split charts into rows of two\\r\\n\\tfunction chunkArray(array, size) {\\r\\n\\t\\tconst result = [];\\r\\n\\t\\tfor (let i = 0; i < array.length; i += size) {\\r\\n\\t\\t\\tresult.push(array.slice(i, i + size));\\r\\n\\t\\t}\\r\\n\\t\\treturn result;\\r\\n\\t}\\r\\n\\r\\n\\tlet chartTypeSelection;\\r\\n<\/script>\\r\\n\\r\\n{#if loadingInformation}\\r\\n\\t<div class=\\"text-center\\">\\r\\n\\t\\t<Heading tag=\\"h1\\" class=\\"mb-4\\" customSize=\\"text-4xl font-extrabold  md:text-5xl lg:text-6xl\\">\\r\\n\\t\\t\\tResults\\r\\n\\t\\t</Heading>\\r\\n\\r\\n\\t\\t<Heading tag=\\"h6\\">\\r\\n\\t\\t\\tProject: <Span gradient>{$project.name}</Span>\\r\\n\\t\\t</Heading>\\r\\n\\t\\t<Heading tag=\\"h6\\" class=\\"mb-4\\">\\r\\n\\t\\t\\tSimulation: <Span gradient>{$simulationName}</Span>\\r\\n\\t\\t</Heading>\\r\\n\\t\\t<Spinner class=\\"mt-4\\" size=\\"10\\" />\\r\\n\\t\\t<P class=\\"my-2 text-center text-gray-400 dark:text-gray-400 sm:px-16 lg:text-lg xl:px-24\\">\\r\\n\\t\\t\\tLoading the information\\r\\n\\t\\t</P>\\r\\n\\t</div>\\r\\n{:else}\\r\\n\\t<div class=\\"text-center\\">\\r\\n\\t\\t<Heading tag=\\"h1\\" class=\\"mb-4\\" customSize=\\"text-4xl font-extrabold  md:text-5xl lg:text-6xl\\">\\r\\n\\t\\t\\tResults\\r\\n\\t\\t</Heading>\\r\\n\\r\\n\\t\\t<Heading tag=\\"h6\\">\\r\\n\\t\\t\\tProject: <Span gradient>{$project.name}</Span>\\r\\n\\t\\t</Heading>\\r\\n\\t\\t<Heading tag=\\"h6\\" class=\\"mb-4\\">\\r\\n\\t\\t\\tSimulation: <Span gradient>{$simulationName}</Span>\\r\\n\\t\\t</Heading>\\r\\n\\r\\n\\t\\t<p class=\\"mb-4\\">\\r\\n\\t\\t\\t{#if charts.length === 0}\\r\\n\\t\\t\\t\\tStart visualizing your results by adding charts.\\r\\n\\t\\t\\t{:else}\\r\\n\\t\\t\\t\\tAnalyze your charts below.\\r\\n\\t\\t\\t{/if}\\r\\n\\t\\t</p>\\r\\n\\r\\n\\t\\t<DataMerge />\\r\\n\\t\\t<Button on:click={addChartToggle}><ChartLineUpOutline class=\\"mr-2\\" /> Add chart</Button>\\r\\n\\r\\n\\t\\t<div class=\\"container mx-auto p-4\\">\\r\\n\\t\\t\\t{#each chunkArray(charts, 2) as row}\\r\\n\\t\\t\\t\\t<div class=\\"-mx-2 flex flex-wrap\\">\\r\\n\\t\\t\\t\\t\\t{#each row as chart2}\\r\\n\\t\\t\\t\\t\\t\\t<div class=\\"mb-4 w-1/2 px-2\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t<div use:chart={chart2.options} />\\r\\n\\t\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t\\t{/each}\\r\\n\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t{/each}\\r\\n\\t\\t</div>\\r\\n\\t</div>\\r\\n{/if}\\r\\n\\r\\n<Modal bind:open={addChartOpen} size=\\"md\\" title=\\"Add Chart\\">\\r\\n\\t<div class=\\"space-y-4\\">\\r\\n\\t\\t<P>Choose type and information for the chart:</P>\\r\\n\\t\\t<div>\\r\\n\\t\\t\\t<label for=\\"chart-selector\\">Select chart type:</label>\\r\\n\\t\\t\\t<Select id=\\"chart-selector\\" bind:value={chartTypeSelection}>\\r\\n\\t\\t\\t\\t{#each ['line', 'bar', 'area', 'scatter', 'heatmap', 'rangeBar'] as option}\\r\\n\\t\\t\\t\\t\\t<option value={option}>{option}</option>\\r\\n\\t\\t\\t\\t{/each}\\r\\n\\t\\t\\t</Select>\\r\\n\\t\\t</div>\\r\\n\\t\\t<div>\\r\\n\\t\\t\\t<label for=\\"data-type\\">Select data source:</label>\\r\\n\\t\\t\\t<Select id=\\"data-type\\" bind:value={selectedFile} on:input={() => (isFileSelected = true)}>\\r\\n\\t\\t\\t\\t{#each paramFileList as option}\\r\\n\\t\\t\\t\\t\\t<option value={option}>{option}</option>\\r\\n\\t\\t\\t\\t{/each}\\r\\n\\t\\t\\t</Select>\\r\\n\\t\\t</div>\\r\\n\\t\\t<div>\\r\\n\\t\\t\\t<label for=\\"x-variable\\">Select variable for x-axis:</label>\\r\\n\\t\\t\\t<Select id=\\"x-variable\\" bind:value={xVar}>\\r\\n\\t\\t\\t\\t{#each axis_opt as option}\\r\\n\\t\\t\\t\\t\\t<option value={option}>{option}</option>\\r\\n\\t\\t\\t\\t{/each}\\r\\n\\t\\t\\t</Select>\\r\\n\\t\\t</div>\\r\\n\\t\\t<div>\\r\\n\\t\\t\\t<label for=\\"chart-title\\">Enter title for the chart:</label>\\r\\n\\t\\t\\t<Input id=\\"chart-title\\" bind:value={chartTitle} placeholder=\\"chart title\\" />\\r\\n\\t\\t</div>\\r\\n\\t\\t<div>\\r\\n\\t\\t\\t<label for=\\"x-title\\">Enter title for x-axis:</label>\\r\\n\\t\\t\\t<Input id=\\"x-title\\" bind:value={xTitle} placeholder=\\"x-axis\\" />\\r\\n\\t\\t</div>\\r\\n\\t\\t<div>\\r\\n\\t\\t\\t<label for=\\"y-title\\">Enter title for y-axis:</label>\\r\\n\\t\\t\\t<Input id=\\"y-title\\" bind:value={yTitle} placeholder=\\"y-axis\\" />\\r\\n\\t\\t</div>\\r\\n\\t\\t<div>\\r\\n\\t\\t\\t<Button on:click={addLine}>Add variable to chart</Button>\\r\\n\\t\\t\\t<div id=\\"add-lines-div\\">\\r\\n\\t\\t\\t\\t{#each lines as line (line.id)}\\r\\n\\t\\t\\t\\t\\t<div id={\`line-\${line.id}\`} class=\\"my-2\\">\\r\\n\\t\\t\\t\\t\\t\\t<Select\\r\\n\\t\\t\\t\\t\\t\\t\\tid={\`variable-selector-\${line.id}\`}\\r\\n\\t\\t\\t\\t\\t\\t\\ton:change={() => {\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tcurrLine = \`line-\${line.id}\`;\\r\\n\\t\\t\\t\\t\\t\\t\\t\\taddYToList(line.id);\\r\\n\\t\\t\\t\\t\\t\\t\\t}}\\r\\n\\t\\t\\t\\t\\t\\t>\\r\\n\\t\\t\\t\\t\\t\\t\\t<option value=\\"\\" disabled selected>Select one</option>\\r\\n\\t\\t\\t\\t\\t\\t\\t{#each axis_opt as option}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t<option value={option}>{option}</option>\\r\\n\\t\\t\\t\\t\\t\\t\\t{/each}\\r\\n\\t\\t\\t\\t\\t\\t</Select>\\r\\n\\t\\t\\t\\t\\t\\t<Button size=\\"sm\\" on:click={() => removeLine(line.id)}>Remove Line</Button>\\r\\n\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t{/each}\\r\\n\\t\\t\\t</div>\\r\\n\\t\\t</div>\\r\\n\\t</div>\\r\\n\\t<div class=\\"mt-4 flex justify-end space-x-2\\">\\r\\n\\t\\t<Button on:click={addChart}>Draw Chart</Button>\\r\\n\\t\\t<Button on:click={addChartToggle}>Cancel</Button>\\r\\n\\t</div>\\r\\n</Modal>\\r\\n\\r\\n<style>\\r\\n\\t.mb-4 {\\r\\n\\t\\tmargin-bottom: 1rem;\\r\\n\\t}\\r\\n\\t.flex-wrap {\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tflex-wrap: wrap;\\r\\n\\t}\\r\\n\\t.p-4 {\\r\\n\\t\\tpadding: 1rem;\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAgZC,mBAAM,CACL,aAAa,CAAE,IAChB,CACA,wBAAW,CACV,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IACZ,CACA,kBAAK,CACJ,OAAO,CAAE,IACV"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_simulationDirectory;
  let $project, $$unsubscribe_project;
  let $simulationName, $$unsubscribe_simulationName;
  $$unsubscribe_simulationDirectory = subscribe(simulationDirectory, (value) => value);
  $$unsubscribe_project = subscribe(project, (value) => $project = value);
  $$unsubscribe_simulationName = subscribe(simulationName, (value) => $simulationName = value);
  let paramFileList = [];
  let axis_opt = [];
  let selectedFile = "";
  let yDict = /* @__PURE__ */ new Map();
  let xVar = "";
  Array.from(yDict.values());
  let xTitle;
  let yTitle;
  let chartTitle;
  let addChartOpen = false;
  let lines = [];
  let charts = [];
  let chartTypeSelection;
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        console.log("Inside reactive block");
      }
    }
    {
      console.log("Value of addChartOpen:", addChartOpen);
    }
    {
      console.log(charts);
    }
    $$rendered = `${`<div class="text-center">${validate_component(Heading, "Heading").$$render(
      $$result,
      {
        tag: "h1",
        class: "mb-4",
        customSize: "text-4xl font-extrabold  md:text-5xl lg:text-6xl"
      },
      {},
      {
        default: () => {
          return `Results`;
        }
      }
    )} ${validate_component(Heading, "Heading").$$render($$result, { tag: "h6" }, {}, {
      default: () => {
        return `Project: ${validate_component(Span, "Span").$$render($$result, { gradient: true }, {}, {
          default: () => {
            return `${escape($project.name)}`;
          }
        })}`;
      }
    })} ${validate_component(Heading, "Heading").$$render($$result, { tag: "h6", class: "mb-4" }, {}, {
      default: () => {
        return `Simulation: ${validate_component(Span, "Span").$$render($$result, { gradient: true }, {}, {
          default: () => {
            return `${escape($simulationName)}`;
          }
        })}`;
      }
    })} ${validate_component(Spinner, "Spinner").$$render($$result, { class: "mt-4", size: "10" }, {}, {})} ${validate_component(P, "P").$$render(
      $$result,
      {
        class: "my-2 text-center text-gray-400 dark:text-gray-400 sm:px-16 lg:text-lg xl:px-24"
      },
      {},
      {
        default: () => {
          return `Loading the information`;
        }
      }
    )}</div>`} ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        size: "md",
        title: "Add Chart",
        open: addChartOpen
      },
      {
        open: ($$value) => {
          addChartOpen = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<div class="space-y-4">${validate_component(P, "P").$$render($$result, {}, {}, {
            default: () => {
              return `Choose type and information for the chart:`;
            }
          })} <div><label for="chart-selector" data-svelte-h="svelte-gq9ela">Select chart type:</label> ${validate_component(Select, "Select").$$render(
            $$result,
            {
              id: "chart-selector",
              value: chartTypeSelection
            },
            {
              value: ($$value) => {
                chartTypeSelection = $$value;
                $$settled = false;
              }
            },
            {
              default: () => {
                return `${each(["line", "bar", "area", "scatter", "heatmap", "rangeBar"], (option) => {
                  return `<option${add_attribute("value", option, 0)}>${escape(option)}</option>`;
                })}`;
              }
            }
          )}</div> <div><label for="data-type" data-svelte-h="svelte-vpz3g2">Select data source:</label> ${validate_component(Select, "Select").$$render(
            $$result,
            { id: "data-type", value: selectedFile },
            {
              value: ($$value) => {
                selectedFile = $$value;
                $$settled = false;
              }
            },
            {
              default: () => {
                return `${each(paramFileList, (option) => {
                  return `<option${add_attribute("value", option, 0)}>${escape(option)}</option>`;
                })}`;
              }
            }
          )}</div> <div><label for="x-variable" data-svelte-h="svelte-1w20vdg">Select variable for x-axis:</label> ${validate_component(Select, "Select").$$render(
            $$result,
            { id: "x-variable", value: xVar },
            {
              value: ($$value) => {
                xVar = $$value;
                $$settled = false;
              }
            },
            {
              default: () => {
                return `${each(axis_opt, (option) => {
                  return `<option${add_attribute("value", option, 0)}>${escape(option)}</option>`;
                })}`;
              }
            }
          )}</div> <div><label for="chart-title" data-svelte-h="svelte-kj7nu9">Enter title for the chart:</label> ${validate_component(Input, "Input").$$render(
            $$result,
            {
              id: "chart-title",
              placeholder: "chart title",
              value: chartTitle
            },
            {
              value: ($$value) => {
                chartTitle = $$value;
                $$settled = false;
              }
            },
            {}
          )}</div> <div><label for="x-title" data-svelte-h="svelte-12og7jw">Enter title for x-axis:</label> ${validate_component(Input, "Input").$$render(
            $$result,
            {
              id: "x-title",
              placeholder: "x-axis",
              value: xTitle
            },
            {
              value: ($$value) => {
                xTitle = $$value;
                $$settled = false;
              }
            },
            {}
          )}</div> <div><label for="y-title" data-svelte-h="svelte-p2qooa">Enter title for y-axis:</label> ${validate_component(Input, "Input").$$render(
            $$result,
            {
              id: "y-title",
              placeholder: "y-axis",
              value: yTitle
            },
            {
              value: ($$value) => {
                yTitle = $$value;
                $$settled = false;
              }
            },
            {}
          )}</div> <div>${validate_component(Button, "Button").$$render($$result, {}, {}, {
            default: () => {
              return `Add variable to chart`;
            }
          })} <div id="add-lines-div">${each(lines, (line) => {
            return `<div${add_attribute("id", `line-${line.id}`, 0)} class="my-2">${validate_component(Select, "Select").$$render($$result, { id: `variable-selector-${line.id}` }, {}, {
              default: () => {
                return `<option value="" disabled selected data-svelte-h="svelte-ekf9xb">Select one</option> ${each(axis_opt, (option) => {
                  return `<option${add_attribute("value", option, 0)}>${escape(option)}</option>`;
                })} `;
              }
            })} ${validate_component(Button, "Button").$$render($$result, { size: "sm" }, {}, {
              default: () => {
                return `Remove Line`;
              }
            })} </div>`;
          })}</div></div></div> <div class="mt-4 flex justify-end space-x-2">${validate_component(Button, "Button").$$render($$result, {}, {}, {
            default: () => {
              return `Draw Chart`;
            }
          })} ${validate_component(Button, "Button").$$render($$result, {}, {}, {
            default: () => {
              return `Cancel`;
            }
          })}</div>`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_simulationDirectory();
  $$unsubscribe_project();
  $$unsubscribe_simulationName();
  return $$rendered;
});
export {
  Page as default
};
