<script>
  //svelte imports
  import { onMount } from 'svelte';

  //D3 imports
  import { scaleLinear, scaleOrdinal } from 'd3-scale';
  import { zoom, zoomIdentity } from 'd3-zoom';

  import { select, selectAll } from 'd3-selection';
  import { drag } from 'd3-drag';
  
	import { 
    forceSimulation, 
    forceLink, 
    forceManyBody, 
    forceCenter, 
    forceX,
    forceY,
    forceCollide 
  } from 'd3-force';
  
  // import data from "$data/graph.js";
  // import data from "$data/graph_100.js";
  //  import data from "$data/graph_1000.js";
  import data from "$data/graph_higgs200.js"

  // Initializing variables related to width/height/margins
  let width = 1500;
	let height = 900;

  const nodeRadius = 5;
  const margin = {
    top: 50, 
    right: 0, 
    bottom: 0, 
    left: 50
  }

  $: innerWidth = width - margin.left - margin.right;
  let innerHeight = height - margin.top - margin.bottom;

  // Setting color range for the nodes
  // Will be modified in later versions
  const colorRange = ['blue', 'red', 'green'];
  const nodeStates = ['Susceptible', 'Infected', 'Recovered'];
  
  // Color scale
  const colorScale = scaleOrdinal()
    .domain(nodeStates)
    .range(colorRange);

  // Declaring and initializing variables related to graph
  export let curr_iteration = 0;

  $: console.log("iteration: ", curr_iteration, "data: ", data[curr_iteration]);
  let nodes = data[curr_iteration]['nodes'].map(d => Object.create(d));
  $: console.log("nodes:", nodes);
  let links = data[curr_iteration]['links'].map(d => Object.create(d));

  $: {
    nodes = data[curr_iteration]['nodes'].map(d => Object.create(d))
    links = data[curr_iteration]['links'].map(d => Object.create(d))
  }

  // Check if we can read graph data correctly
  //console.logs(currGraph);

  // Todo: understand how zoom works
  let transform = zoomIdentity;
  let simulation;
  let svg; //we used bind:this in html element

  onMount( () => {
    console.log("hellooooonodes:", nodes.map(d => Object.create(d)));
     // Instantiate a new force simulation with "nodes" array as the argument
    simulation = forceSimulation(nodes)
		.force("link", forceLink(links).id(d => d.id))
		.force("charge", forceManyBody())
		.force("center", forceCenter(width / 2, height / 2))
		.on('tick', simulationUpdate);

    select(svg)
      .call(drag()
        .container(svg)
        .subject(dragsubject)
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended))
      .call(zoom()
            .scaleExtent([1 / 10, 8])
            .on('zoom', zoomed));
  });

  function simulationUpdate () {
    simulation.tick();
    // nodes = data[curr_iteration]['nodes'].map(d => Object.create(d));
    // nodes = [...nodes];
    // links = [...links];
	}

    function zoomed(currentEvent) {
        transform = currentEvent.transform;
        simulationUpdate();
    }

	function dragsubject(currentEvent) {
        const node = simulation.find(transform.invertX(currentEvent.x), transform.invertY(currentEvent.y), nodeRadius);
        if (node) {
            node.x = transform.applyX(node.x);
            node.y = transform.applyY(node.y);
        }
        return node;
	}

    function dragstarted(currentEvent) {
        if (!currentEvent.active) simulation.alphaTarget(0.3).restart();
        currentEvent.subject.fx = transform.invertX(currentEvent.subject.x);
        currentEvent.subject.fy = transform.invertY(currentEvent.subject.y);
    }

    function dragged(currentEvent) {
        currentEvent.subject.fx = transform.invertX(currentEvent.x);
        currentEvent.subject.fy = transform.invertY(currentEvent.y);
    }

    function dragended(currentEvent) {
        if (!currentEvent.active) simulation.alphaTarget(0);
        currentEvent.subject.fx = null;
        currentEvent.subject.fy = null;
    }

	function resize() {
		({ width, height } = svg.getBoundingClientRect());
	}


 
</script>

<svelte:window on:resize='{resize}'/>

<div class="chart-container" bind:this={svg}>
  <svg {width} {height}>
    <g class="chart">
      {#each links as link}
        <line 
          x1='{link.source.x}' y1='{link.source.y}' 
          x2='{link.target.x}' y2='{link.target.y}'
          stroke='#999' stroke-opacity='0.6'
          transform='translate({transform.x} {transform.y}) scale({transform.k} {transform.k})'
        >
          <!-- <title>{link.source.id}</title> -->
        </line>
      {/each}
      {#each nodes as node}
        <circle
          cx='{node.x}'
          cy='{node.y}'
          r=5
          fill={colorScale(node.node)}
          transform='translate({transform.x} {transform.y}) scale({transform.k} {transform.k})'
          stroke="black"
          title={node.node}
        /> 
      {/each}
    </g>
  </svg>
</div>
