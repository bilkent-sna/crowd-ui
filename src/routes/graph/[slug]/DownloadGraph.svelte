<script>
	// @ts-nocheck
	import { onMount, createEventDispatcher } from 'svelte';
	import { Button, Select } from 'flowbite-svelte';
	import { saveAs } from 'file-saver';
	import gifshot from 'gifshot';
	import { DownloadOutline } from 'flowbite-svelte-icons';
	import ButtonGroup from 'flowbite-svelte/ButtonGroup.svelte';
	import { forceSimulation, forceLink, forceManyBody, forceCenter } from 'd3-force';
	import { scaleLinear, scaleOrdinal } from 'd3-scale';
	import { select, selectAll } from 'd3-selection';

	export let svgComponent; // Bound SVG element
	export let iteration_nums;
	export let data;
	export let width;
	export let height;
	export let nodeRadius;
	export let nodeStates;
	export let colorRange;
	export let format = 'png';
	export let downloadTrigger;

	const dispatch = createEventDispatcher();

	let svgCopy;
	let simulationCopy;
	let iteration_index = 0;

	let graph = data[iteration_nums[iteration_index]];
	let links = graph.links.map((d) => Object.create(d));
	let nodes = graph.nodes.map((d) => Object.create(d));

	let alpha_var = 0;
	let alpha_decay_var = 0;

	//The following block sets the graph loading animation speed based on the number of nodes
	let node_count = nodes.length;
	if (node_count < 500) {
		alpha_var = 0.3;
		alpha_decay_var = 0.05;
	} else if (node_count < 2000) {
		alpha_var = 0.3;
		alpha_decay_var = 0.15;
	} else if (node_count < 10000) {
		alpha_var = 0.3;
		alpha_decay_var = 0.15;
	} else {
		console.log("Graph is too large, don't visualize");
	}

	const scaleX = scaleLinear()
		.domain([0, width])
		.range([nodeRadius, width - nodeRadius]);
	const scaleY = scaleLinear()
		.domain([0, height])
		.range([nodeRadius, height - nodeRadius]);

	let d3 = {
		scaleLinear,
		scaleOrdinal,
		forceSimulation,
		forceLink,
		forceManyBody,
		forceCenter,
		select
	};

	function initializeSimulation() {
		simulationCopy = d3
			.forceSimulation(nodes)
			.force(
				'link',
				d3.forceLink(links).id((d) => d.id)
			)
			.force('charge', d3.forceManyBody().strength(-110))
			.force('center', d3.forceCenter(width / 2, height / 2))
			.alpha(alpha_var) // [0,1] how much movement, how fast
			.alphaDecay(alpha_decay_var)
			.on('tick', simulationUpdate);
	}

	function updateGraph() {
		console.log('iteration number:', iteration_nums[iteration_index]);
		graph = data[iteration_nums[iteration_index]];
		links = graph.links.map((d) => Object.create(d));
		nodes = graph.nodes.map((d) => Object.create(d));

		// Clear previous elements
		const g = select(svgCopy).select('g');
		g.selectAll('*').remove();

		// Add new links
		g.selectAll('.link')
			.data(links)
			.enter()
			.append('line')
			.attr('class', 'link')
			.attr('stroke-opacity', 0.9)
			.attr('stroke', '#999');

		// Add new nodes
		g.selectAll('.node')
			.data(nodes)
			.enter()
			.append('circle')
			.attr('class', 'node')
			.attr('r', nodeRadius)
			.attr('fill', (d) => colorScale(d.node))
			.attr('stroke', '#060606')
			.attr('stroke-width', 1);

		// Restart simulation with new data
		simulationCopy.nodes(nodes);
		simulationCopy.force('link').links(links);
		simulationCopy.alpha(alpha_var).alphaDecay(alpha_decay_var).restart();
	}

	function simulationUpdate() {
		// Ensure correct tick handling to update positions dynamically
		select(svgCopy)
			.selectAll('.node')
			.data(nodes)
			.attr('cx', (d) => d.x)
			.attr('cy', (d) => d.y);

		select(svgCopy)
			.selectAll('.link')
			.data(links)
			.attr('x1', (d) => d.source.x)
			.attr('y1', (d) => d.source.y)
			.attr('x2', (d) => d.target.x)
			.attr('y2', (d) => d.target.y);
	}

	// Color scale
	const colorScale = scaleOrdinal().domain(nodeStates).range(colorRange);

	function createStyleElementFromCSS() {
		const style = document.createElement('style');
		const cssRules = Array.from(document.styleSheets)
			.map((sheet) => {
				try {
					return Array.from(sheet.cssRules)
						.map((rule) => rule.cssText)
						.join('\n');
				} catch (e) {
					console.warn('Could not access stylesheet:', sheet, e);
					return ''; // Ignore any cross-origin errors
				}
			})
			.join('\n');

		style.textContent = cssRules;
		return style;
	}

	/*
		code for this function is from: https://takuti.me/note/javascript-save-svg-as-image/
	*/

	// Helper: Create the SVG string with proper XML header
	function createSVGWithHeaders(svgElement) {
		const serializer = new XMLSerializer();
		const styleElement = createStyleElementFromCSS();

		// Clone the original SVG to avoid modifying it
		const svgClone = svgElement.cloneNode(true);

		// Insert CSS styles at the top of the SVG
		svgClone.insertBefore(styleElement, svgClone.firstChild);

		// Serialize the SVG to a string
		const svgContent = serializer.serializeToString(svgClone);

		// Construct the complete SVG with XML declaration at the very top
		const svgString =
			`<?xml version="1.0" encoding="UTF-8"?>\n` +
			`<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n` +
			svgContent;

		return svgString;
	}

	// Download the current iteration as PNG, JPEG, or SVG
	function downloadCurrentIteration() {
		const svgString = createSVGWithHeaders(svgComponent);
		const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });

		// Handle SVG download directly
		if (format === 'svg') {
			saveAs(svgBlob, 'graph.svg');
			return;
		}

		// For PNG or JPEG, render SVG on a canvas
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');

		const { width, height } = svgComponent.getBoundingClientRect();
		const viewBox = svgComponent.getAttribute('viewBox')?.split(' ') || [0, 0, width, height];

		canvas.width = parseFloat(viewBox[2]);
		canvas.height = parseFloat(viewBox[3]);

		// Ensure a white background for JPEG
		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		const img = new Image();

		img.onload = () => {
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

			// Export the canvas content as PNG or JPEG
			canvas.toBlob((blob) => {
				saveAs(blob, `graph.${format}`);
			}, `image/${format}`);
		};

		// Set the SVG blob as the image source
		img.src = URL.createObjectURL(svgBlob);
	}

	let gifDownload = false;
	async function downloadGif() {
		gifDownload = true;
		const frames = [];
		const iterationCount = iteration_nums.length;

		// Initialize the simulation copy
		initializeSimulation();

		// Function to render SVG to Canvas and capture the result
		function renderSvgToCanvas(svgElement) {
			return new Promise((resolve) => {
				if (!svgElement) {
					console.error('SVG element is undefined');
					resolve(null); // Early resolve if svgElement is not valid
					return;
				}
				const { width, height } = svgElement.getBoundingClientRect();

				// Create a canvas with the same dimensions as the SVG
				const canvas = document.createElement('canvas');
				canvas.width = width;
				canvas.height = height;

				const ctx = canvas.getContext('2d');
				ctx.fillStyle = 'white'; // Set a white background
				ctx.fillRect(0, 0, width, height); // Clear canvas

				// Create an Image object to render SVG content
				const svgString = createSVGWithHeaders(svgElement);
				const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
				const img = new Image();
				img.src = URL.createObjectURL(svgBlob);

				img.onload = () => {
					ctx.drawImage(img, 0, 0, width, height); // Draw SVG on the canvas
					URL.revokeObjectURL(img.src); // Clean up the blob URL
					resolve(canvas.toDataURL('image/png')); // Resolve with image data
				};

				img.onerror = (err) => {
					console.error('Error rendering SVG to canvas:', err);
					resolve(null); // Resolve with null to avoid breaking the loop
				};
			});
		}

		// Function to capture a single frame
		async function captureFrame(index) {
			iteration_index = index;
			updateGraph(); // Update graph data

			// Allow time for rendering to complete
			await new Promise((resolve) => setTimeout(resolve, 100)); // Increased timeout

			// Capture the current SVG state as an image
			const svgImageData = await renderSvgToCanvas(svgCopy);
			if (svgImageData) {
				frames.push(svgImageData); // Push the image data to the frames array
				console.log(`Frame ${index} captured. Total frames: ${frames.length}`);
			} else {
				console.error(`Failed to capture frame ${index}`);
			}
		}

		// Create frames sequentially
		for (let i = 0; i < iterationCount; i++) {
			await captureFrame(i); // Wait for the promise to resolve before proceeding
		}

		console.log('All frames captured, creating GIF.');

		// Use gifshot to create the GIF
		gifshot.createGIF(
			{
				images: frames,
				gifWidth: svgCopy.clientWidth,
				gifHeight: svgCopy.clientHeight,
				interval: 1, // Adjust interval as needed
				numFrames: frames.length,
				quality: 10
			},
			(obj) => {
				if (!obj.error) {
					console.log('GIF created successfully.');
					saveAs(obj.image, 'graph.gif'); // Save the GIF
				} else {
					console.error('Error creating GIF:', obj.error);
				}

				// Clean up frames
				frames.forEach((url) => URL.revokeObjectURL(url)); // Revoke URLs
			}
		);
		gifDownload = false;
	}

	async function download() {
		if (format === 'gif') {
			await downloadGif();
		} else {
			await downloadCurrentIteration();
		}
	}

	async function handleDownload(downloadTrigger) {
		if (downloadTrigger) {
			console.log('Event triggered from parent!');
			await download();
			dispatch('complete');
		}
	}

	// React when downloadTrigger changes
	$: handleDownload(downloadTrigger);
</script>

{#if gifDownload}
	<div style="border: 1px solid black;" class="mt-2">
		<svg id="graph2" bind:this={svgCopy} {width} {height}>
			<g>
				{#each links as link}
					<line
						class="link"
						x1={link.source.x}
						y1={link.source.y}
						x2={link.target.x}
						y2={link.target.y}
						stroke-opacity={'.9'}
					>
						<title>{link.source.id}</title>
					</line>
				{/each}

				{#each nodes as point}
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<circle
						class="node"
						r="5"
						fill={colorScale(point.node)}
						cx={point.x}
						cy={point.y}
						opacity={'1'}
					>
						<title>{point.id}</title></circle
					>
				{/each}
			</g>
		</svg>
	</div>
{/if}

<style>
	circle {
		stroke: #060606;
		stroke-width: 1;
	}

	line {
		stroke: #999;
	}
</style>
