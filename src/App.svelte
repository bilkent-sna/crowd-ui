<script>
  import data from "$data/data.js";

  //console.log(data);

  import {
    forceSimulation, 
    forceX, 
    forceY, 
    forceCollide
  } from "d3-force";

  const RADIUS = 5;
  //instantiate a new force simulation with "data" array as the argument
  //then we have a series of arguments to declare each relevant force
  const simulation = forceSimulation(data);

  //Moved this into its own reactive block
  $: {
    simulation
      .force("x", 
        forceX()
          .x(d => xScale(d.happiness)) //d is an accessor. we can call it anything we want
          //within each d, find d.happiness bc that is the variable we'll use on our x axis 
          .strength(0.8) //how strong the physics at hand here that is organizing things at x axis
      )
      .force('y',
        forceY()
          .y(d => yScale(d.continent))
          .strength(0.2)
      )
      .force('collide',
        //forceCollide().radius(RADIUS)
        //+1 to add more space, personal preference
        forceCollide().radius( (d) => radiusScale(d.happiness) + 1)
      )
      .alpha(.3) // [0,1] how much movement, how fast
      .alphaDecay(.0005) //[0, 1] the rate which alpha approaches zero. how long does it take btw simulation states
      .restart();//Restart the simulation when any of these operands change
    }

  let nodes = [];
  //only update nodes whenever the simulation ticks
  //not whenever it updates ($)
  simulation.on("tick", () => {
    nodes = simulation.nodes();
  }); 

  //to display outputs of the simulation
  //$: console.log(simulation.nodes())

  //we notice 2 problems: 
  //1. x values are not scaled (scale)
  //2. y values are NaN. we did sth wrong. bc d.continent is not numeric. (scaleBand)

  let width = 400, 
    height = 400;
    
  const margin = {
    top: 0, 
    right: 0, 
    bottom: 20, 
    left: 0
  }

  $: innerWidth = width - margin.left - margin.right;
  let innerHeight = height - margin.top - margin.bottom;

  //$: console.log({innerWidth})

  import { mean, rollups } from "d3-array";

  //Generate the average for each continent, so that we can sort according to that
  const continents = rollups(
    data, //1.group data
    v => mean(v, d => d.happiness), //3.in that group, find the avg of happiness scores
    d => d.continent //2.by continent
  ) //Group data by continent and return the group-wide mean
    .sort((a,b) => a[1] - b[1]) //Sort according to value
    .map(d => d[0]); //Grab the continent name

  //Add a color to each circle according to its continent
  import  { scaleOrdinal, scaleSqrt } from "d3-scale";

  const colorRange = ["#dda0dd", "#fe7f2d", "#fcca46", "#a1c181", "#619b8a", "#eae2b7"];

  const colorScale = scaleOrdinal()
    .domain(continents) //INPUT 
    .range(colorRange); //OUTPUT


  import { scaleLinear, scaleBand } from "d3-scale";
  //import extent from "d3-array";
    
  $: xScale = scaleLinear()
    .domain([1, 9]) //INPUT
    //.domain(extent(data, d => d.happiness)) //to get the min and max of data array
    .range([0, innerWidth]) //OUTPUT

  //to map the continents according to positions on canvas equally   
  let yScale = scaleBand()
    //.domain(data.map(d => d.continent)) //an array of all continents
    .domain(continents)
    .range([innerHeight, 0])
    .paddingOuter(0.5)

  //Size of circles
  // const radiusScale = scaleSqrt()
  //   .domain([1, 9]) //INPUT
  //   .range([3, 8]) //OUTPUT

  //Make the function above reactive so in very small screens
  //we can have very small circles, proportional to their screen
  $: radiusScale = scaleSqrt()
    .domain([1, 9]) //INPUT
    .range(width < 568 ? [2, 6] : [3, 8]) //OUTPUT
</script>

<div class="chart-container" bind:clientWidth={width}>
  <svg {width} {height}>
    <g class="inner-chart" transform="translate({margin.left}, {margin.top})">
      {#each nodes as node}
        <circle
          cx={node.x}
          cy={node.y}
          r={radiusScale(node.happiness)}
          fill={colorScale(node.continent)}
          stroke="black"
        /> 
      {/each}
    </g>
  </svg>
</div>
