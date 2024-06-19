<script>
    import { saveAs } from 'file-saver';
    import { Input, Button, Icon } from "@sveltestrap/sveltestrap";
  
    export let chartId; // ID of the chart to download
    export let getSVG; // Function to get the chart canvas element
  
    let downloadFormat = '';
    // $: console.log(downloadFormat);
    let showDownloadOptions = false;
    let showSaveButtons = false;
  
    function startDownload() {
    //   downloadFormat = format;
      showSaveButtons = true;
      showDownloadOptions = false;
    }
   
    function downloadChart(saveAsOption) {
        const svg = getSVG(chartId);
        if (!svg) return;

        const svgData = new XMLSerializer().serializeToString(svg);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        
        if (downloadFormat === 'svg') {
        const url = URL.createObjectURL(svgBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `chart.${downloadFormat}`;
        link.click();
        URL.revokeObjectURL(url);
        } 
        
        else {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const image = new Image();

            image.onload = () => {
                canvas.width = svg.clientWidth;
                canvas.height = svg.clientHeight;

                // Set a white background before drawing the SVG image
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.drawImage(image, 0, 0);
                
                canvas.toBlob(blob => {
                const filename = `chart.${downloadFormat}`;
                console.log("filename", filename);
                // if (saveAsOption) {
                //     const link = document.createElement('a');
                //     link.href = URL.createObjectURL(blob);
                //     link.download = filename;
                //     link.click();
                //     URL.revokeObjectURL(link.href);
                // } else {
                //     saveAs(blob, filename);
                // }
                saveAs(blob, filename);

                // Hide buttons after download starts
                showSaveButtons = false;
                }, `image/${downloadFormat}`);
        };

        const url = URL.createObjectURL(svgBlob);
        image.src = url;
        }
    }
  </script>
<!--   
  <style>
    .download-icon {
      font-size: 1.5em;
      cursor: pointer;
    }
  </style> -->
  
  <div>
    <!-- <Icon name='download' on:click={() => showDownloadOptions = !showDownloadOptions} /> -->
    <Button color="link" on:click={() => showDownloadOptions = !showDownloadOptions}>Download</Button>
    {#if showDownloadOptions}
      <Input type="select" bind:value={downloadFormat} on:input={() => startDownload()}>
        <option value="" disabled selected>Select format</option>
        <option value="jpeg">JPEG</option>
        <option value="svg">SVG</option>
        <option value="png">PNG</option>
      </Input>
    {/if}
    {#if showSaveButtons}
      <Button color="link" on:click={() => downloadChart(false)}>Save</Button>
      <Button color="link" on:click={() => downloadChart(true)}>Save As</Button>
    {/if}
  </div>
  