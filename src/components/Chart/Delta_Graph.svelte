<script>
    /*
      This component creates a line chart which can have multiple lines on it.
      xVar contains the values of the x axis
      yVars is an array containing values for y axis for multiple charts
      We get the values of these variables as props from the Results component
      This component is a modified version of Stefano Agresti's interactive line chart using Svelte and D3
      Original code by can be found in:
       https://medium.com/@stefano.agresti19/building-an-interactive-line-chart-using-svelte-and-d3-71841cf5703c
    */
    import { scaleLinear, scaleOrdinal } from "d3-scale";
    import Tick from "./Tick.svelte"
    import Tooltip from "./Tooltip.svelte";

    export let chartWidth;
    export let chartHeight;
    export let tooltip_switch = false;

    export let data; //status_delta
    
    export let xVar;
    export let yVars;
    export let id;

    export let xTitle = "";
    export let yTitle = "";
    export let chartTitle = "";

    export let colorFunction = undefined;

    const paddings = {
      top: 50,
      left: 50,
      right: 50,
      bottom: 50,
    };

    //scale functions to set x and y coordinates of the graphs
    const xScale = scaleLinear()
        .domain([Math.min(...data.map((d) => d[xVar])), Math.max(...data.map((d) => d[xVar])),])
        .range([paddings.left, chartWidth - paddings.right]);
    
    const yScale = scaleLinear()
        .domain([Math.min(...data.map((d) => Math.min(...yVars.map((yVar) => d[yVar])))), Math.max(...data.map((d) => Math.max(...yVars.map((yVar) => d[yVar])))),])
        .range([chartHeight - paddings.bottom, paddings.top])
        .nice(10); //useful to draw ticks on the y axis
        //basically rounds up the maximum value of the domain to split it into 10 slices in a nice way
    
    //scale function to set the colors of the graphs
    let colorScale;
    if(colorFunction === undefined){
      colorScale = scaleOrdinal()
                  .domain(yVars)
                  .range(["#e41a1c","#377eb8","#4daf4a","#984ea3",
             "#ff7f00","#ffff33","#a65628","#f781bf","#999999"])
    }
    else{
      colorScale = colorFunction;
    }

    //divides x and y axes into 10 pieces
    const yGrid = yScale.ticks(10)
    const xGrid = xScale.ticks(10)

    //adding tooltip if user turned on tooltip_switch
    const idContainer = 'svg-container-' + id;
    let mousePosition = { x: null, y: null }

    function followMouse(event) {
      const svg = document.getElementById(idContainer)
      if (svg === null)
        return

      const dim = svg.getBoundingClientRect()
      const positionInSVG = { 
        x: event.clientX - dim.left, 
        y: event.clientY - dim.top 
      }

      mousePosition =
        positionInSVG.x > paddings.left &&
        positionInSVG.x < chartWidth - paddings.right &&
        positionInSVG.y > paddings.top &&
        positionInSVG.y < chartHeight - paddings.bottom
          ? { x: positionInSVG.x, y: positionInSVG.y }
          : { x: null, y: null }
    }

    function removePointer() {
      mousePosition = { x: null, y: null }
    }

    function computeSelectedXValue(value) {
      return data.filter((d) => xScale(d[xVar]) >= value)[0][xVar]
    }

  </script>

  {#if tooltip_switch} 
    <svg width={chartWidth} 
        height={chartHeight}
        on:mousemove={followMouse}
        on:mouseleave={removePointer}
        id={idContainer} >
     <g>
      <!-- titles -->
      {#if xTitle !== ""}
        <text x={chartWidth / 2} y={chartHeight - 10} text-anchor="middle" font-size="16">
          {xTitle}
        </text>
      {/if}
      
      {#if yTitle !== ""}
        <text x={-chartHeight / 2} y={15} text-anchor="middle" font-size="16" transform="rotate(-90)">
          {yTitle}
        </text>
      {/if}

      {#if chartTitle !== ""}
        <text x={chartWidth / 2} y={paddings.top - 10} text-anchor="middle" font-size="16">
          {chartTitle}
        </text>
      {/if}
    
      <!-- lines -->
       <line
         x1={paddings.left}
         x2={chartWidth - paddings.right}
         y1={chartHeight - paddings.bottom}
         y2={chartHeight - paddings.bottom}
         stroke="black"
         stroke-width="2"
       />
       <line
         x1={paddings.left}
         x2={paddings.left}
         y1={paddings.top}
         y2={chartHeight - paddings.bottom}
         stroke="black"
         stroke-width="2"
       />
      </g>
      <g>
        {#each data as datum, i}
          {#each yVars as yVar}
            {#if i != data.length - 1}
              <line
                x1={xScale(data[i][xVar])}
                x2={xScale(data[i + 1][xVar])}
                y1={yScale(data[i][yVar])}
                y2={yScale(data[i + 1][yVar])}
                stroke={colorScale(yVar)}
                stroke-width="2"
              />
           {/if}
          {/each}
        {/each}
      </g>
      <g>
        {#each yGrid.slice(1) as gridLine}
          <Tick
            x={paddings.left}
            y={yScale(gridLine)}
            value={gridLine}
            direction={"horizontal"}
          />
        {/each}
      </g>
      <g>
        {#each xGrid as gridLine}
          <Tick
            x={xScale(gridLine)}
            y={chartHeight - paddings.bottom}
            value={gridLine}
            direction={"vertical"}
            format={false}
          />
        {/each}
      </g>
      {#if mousePosition.x !== null}
        <g transform="translate({xScale(computeSelectedXValue(mousePosition.x))} 0)">
          <line
            x1="0"
            x2="0"
            y1={paddings.top}
            y2={chartHeight - paddings.bottom - 2}
            stroke="black"
            stroke-width="1"
          />
          {#each yVars as yVar}
            <circle
              cx={0}
              cy={yScale(
                data.find(
                  (d) => d[xVar] === computeSelectedXValue(mousePosition.x)
                  )[yVar]
                )}
              r="3"
              fill={colorScale(yVar)}
            />
          {/each}
        </g>
        <Tooltip
            labels={yVars}
            values={data.find(
              (d) => d[xVar] === computeSelectedXValue(mousePosition.x))}
            {colorScale}
            x={mousePosition.x + 180 > chartWidth
              ? mousePosition.x - 195
              : mousePosition.x + 15}
            y={Math.max(0, mousePosition.y - (yVars.length + 2) * 25)}
            backgroundColor={"black"}
            opacity="0.5"
            textColor={"white"}
            title={xVar + ": " + computeSelectedXValue(mousePosition.x)}
            width="180"
            adaptTexts={false}
          />
      {/if}
    </svg>
  {:else}
    <svg width={chartWidth} 
      height={chartHeight}
      id={idContainer}>
      <g>
        <!-- titles -->
        {#if xTitle !== ""}
          <text x={chartWidth / 2} y={chartHeight - 10} text-anchor="middle" font-size="16">
            {xTitle}
          </text>
        {/if}
        
        {#if yTitle !== ""}
          <text x={-chartHeight / 2} y={15} text-anchor="middle" font-size="16" transform="rotate(-90)">
            {yTitle}
          </text>
        {/if}

        {#if chartTitle !== ""}
          <text x={chartWidth / 2} y={paddings.top - 10} text-anchor="middle" font-size="16">
            {chartTitle}
          </text>
        {/if}
        
        <!-- lines -->
        <line
          x1={paddings.left}
          x2={chartWidth - paddings.right}
          y1={chartHeight - paddings.bottom}
          y2={chartHeight - paddings.bottom}
          stroke="black"
          stroke-width="2"
        />
        <line
          x1={paddings.left}
          x2={paddings.left}
          y1={paddings.top}
          y2={chartHeight - paddings.bottom}
          stroke="black"
          stroke-width="2"
        />
      </g>
      <g>
        {#each data as datum, i}
          {#each yVars as yVar}
            {#if i != data.length - 1}
              <line
                x1={xScale(data[i][xVar])}
                x2={xScale(data[i + 1][xVar])}
                y1={yScale(data[i][yVar])}
                y2={yScale(data[i + 1][yVar])}
                stroke={colorScale(yVar)}
                stroke-width="2"
              />
          {/if}
          {/each}
        {/each}
      </g>
      <g>
        {#each yGrid.slice(1) as gridLine}
          <Tick
            x={paddings.left}
            y={yScale(gridLine)}
            value={gridLine}
            direction={"horizontal"}
          />
        {/each}
      </g>
      <g>
        {#each xGrid as gridLine}
          <Tick
            x={xScale(gridLine)}
            y={chartHeight - paddings.bottom}
            value={gridLine}
            direction={"vertical"}
            format={false}
          />
        {/each}
      </g>
    </svg>
  {/if}
  