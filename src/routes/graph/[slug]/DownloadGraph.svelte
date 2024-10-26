<script>
	import { onMount } from 'svelte';
	import { Button, Select } from 'flowbite-svelte';
	import { saveAs } from 'file-saver';
	import gifshot from 'gifshot';
	import { DownloadOutline } from 'flowbite-svelte-icons';
	import ButtonGroup from 'flowbite-svelte/ButtonGroup.svelte';

	export let svgComponent; // Bound SVG element
	export let iterations; // Array of SVG elements for GIF

	let format = 'png';

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

	function downloadGif() {}

	const downloadTypes = [
		{
			value: 'png',
			name: 'PNG'
		},
		{
			value: 'svg',
			name: 'SVG'
		},
		{
			value: 'jpeg',
			name: 'JPEG'
		},
		{
			value: 'gif',
			name: 'GIF'
		}
	];

	function download() {
		if (format === 'gif') {
			downloadGif();
		} else {
			downloadCurrentIteration();
		}
	}
</script>

<!-- Button Group -->
<ButtonGroup class="flex items-center overflow-hidden rounded-lg border shadow-md">
	<Button
		on:click={download}
		class="bg-primary-600 px-4 py-2 text-white hover:bg-primary-800 hover:text-gray-50"
	>
		<DownloadOutline class="h-5 w-5" />
		<!-- Download -->
	</Button>

	<Select
		items={downloadTypes}
		bind:value={format}
		class="w-20 cursor-pointer border-none bg-white px-4 py-2 hover:bg-gray-50"
	/>
</ButtonGroup>
