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
  
  import data from "$data/graph.js";

  let currGraphIndex = 0;
  let currGraph = data[currGraphIndex];

  let nodes = data[currGraphIndex]['nodes'];
  let links = data[currGraphIndex]['links'];

  console.log(currGraph);

  // Function to create the graph
  function createGraph() {
    const svg = select('svg');
    const width = +svg.attr('width');
    const height = +svg.attr('height');

    const simulation = forceSimulation()
      .force('link', forceLink().id(d => d.id))
      .force('charge', forceManyBody().strength(-100))
      .force('center', forceCenter(width / 2, height / 2));

    const link = svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('stroke-width', d => Math.sqrt(d.weight))
      .attr('stroke', '#cecece');

    const node = svg.append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(nodes)
      .enter().append('circle')
      .attr('r', 5)
      .attr('fill', d => d.gender === 'male' ? 'blue' : 'pink');

      //done
      node.append('title')
      .text(d => d.node);

      //done
      simulation.nodes((nodes))
      .on('tick', () => {
        link
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y);

        node
          .attr('cx', d => d.x)
          .attr('cy', d => d.y);
      });

    simulation.force('link')
      .links(links);
  }

  onMount(() => {
    createGraph();
  });
</script>

<svg width="960" height="600">
  <!-- SVG elements will be added dynamically here -->
</svg>
<!-- // Set the other arguments of simulation in a reactive block
// So that whenever any variable's value changes, the code block will run
$: {
  console.log("current iteration inside component", curr_iteration);
  nodes = data[curr_iteration]['nodes'];
  links = data[curr_iteration]['links'];
  simulation
    .nodes((nodes))
    .force("link", forceLink(links).id(d => d.id))
    .force("charge", forceManyBody())
    .force("center", forceCenter(innerWidth / 2, innerHeight / 2));  
} -->