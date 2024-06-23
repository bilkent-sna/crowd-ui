<script>
	import { onMount } from 'svelte';
	import { Button } from 'flowbite-svelte';
	import { saveAs } from 'file-saver';
	import gifshot from 'gifshot';
	import { CameraPhotoSolid, ImageSolid } from 'flowbite-svelte-icons';

	export let svgComponent;
	export let iterations;

	console.log(svgComponent);

	let format = 'png';

	function downloadCurrentIteration() {
		const serializer = new XMLSerializer();
		const svgString = serializer.serializeToString(svgComponent);
		console.log(svgString);
		const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
		console.log(svgBlob);

		if (format === 'svg') {
			saveAs(svgBlob, 'graph.svg');
		} else {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			const img = new window.Image();

			img.onload = () => {
				canvas.width = img.width;
				canvas.height = img.height;
				ctx.drawImage(img, 0, 0);

				canvas.toBlob((blob) => {
					saveAs(blob, `graph.${format}`);
				}, `image/${format}`);
			};
			img.src = URL.createObjectURL(svgBlob);
		}
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
				interval: 2,
				loop: false
			},
			function (obj) {
				if (!obj.error) {
					saveAs(obj.image, 'graph.gif');
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
