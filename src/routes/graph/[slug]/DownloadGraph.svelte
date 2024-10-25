<script>
	import { onMount } from 'svelte';
	import { Button } from 'flowbite-svelte';
	import { saveAs } from 'file-saver';
	import gifshot from 'gifshot';
	import { CameraPhotoSolid, ImageSolid } from 'flowbite-svelte-icons';

	export let svgComponent; // Bound SVG element
	export let iterations; // Array of SVG elements for GIF

	let format = 'png';

	function downloadCurrentIteration() {
		const serializer = new XMLSerializer();

		// Adjust line styling to ensure visibility
		svgComponent.querySelectorAll('line').forEach((line) => {
			line.setAttribute('stroke-width', '2'); // Thicker line
			line.setAttribute('stroke-opacity', '1'); // Fully opaque
		});

		const svgString = serializer.serializeToString(svgComponent);
		const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });

		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		const img = new Image();

		// Extract SVG dimensions and viewBox
		const { width, height } = svgComponent.getBoundingClientRect();
		const viewBox = svgComponent.getAttribute('viewBox')?.split(' ') || [0, 0, width, height];

		canvas.width = parseFloat(viewBox[2]);
		canvas.height = parseFloat(viewBox[3]);

		// Set canvas background to white
		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		img.onload = () => {
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

			canvas.toBlob((blob) => {
				saveAs(blob, `graph.${format}`);
			}, `image/${format}`);
		};

		img.src = URL.createObjectURL(svgBlob);
	}

	function downloadGif() {
		const frames = iterations.map((svgElement) => {
			const serializer = new XMLSerializer();
			const svgString = serializer.serializeToString(svgElement);
			return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));
		});

		gifshot.createGIF(
			{
				images: frames,
				interval: 2, // 2 seconds between frames
				loop: false
			},
			(obj) => {
				if (!obj.error) {
					saveAs(obj.image, 'graph.gif');
				} else {
					console.error('GIF creation failed:', obj.error);
				}
			}
		);
	}
</script>

<div class="flex space-x-2">
	<Button on:click={downloadCurrentIteration} color="blue">
		<CameraPhotoSolid class="mr-2 h-5 w-5" />
		Download Current ({format.toUpperCase()})
	</Button>

	<Button on:click={downloadGif} color="green">
		<ImageSolid class="mr-2 h-5 w-5" />
		Download GIF
	</Button>

	<select bind:value={format} class="rounded border p-2">
		<option value="png">PNG</option>
		<option value="svg">SVG</option>
		<option value="jpeg">JPEG</option>
	</select>
</div>
