<script>
    /*
        Base code for d3 & svelte graph by Mark Hughes 
        from: https://github.com/happybeing/d3-fdg-svelte/tree/master?tab=readme-ov-file
    */
	import { onMount } from 'svelte';
	import { scaleLinear, scaleOrdinal } from 'd3-scale';
    import { zoom, zoomIdentity } from 'd3-zoom';
	// import { schemeCategory10 } from 'd3-scale-chromatic'; // Imported for color scheme
	import { select, selectAll } from 'd3-selection';
	import { drag } from 'd3-drag';
	import { forceSimulation, forceLink, forceManyBody, forceCenter } from 'd3-force';
    import { Button, Container, Row, Col, Input } from 'sveltestrap';
    import { Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, CardSubtitle } from 'sveltestrap';

	let d3 = { zoom, zoomIdentity, scaleLinear, scaleOrdinal, select, selectAll, drag,  forceSimulation, forceLink, forceManyBody, forceCenter }

	// import data from "$data/graph.js";
    //import data from "$data/graph_100.js";
    // import data from "$data/graph_1000.js";
    //import data from "$data/graph_higgs200.js"
    import data from "$data/graph_200.js"
    import simulation_info from "$data/simulation_info.json"
   
	const epoch_num = simulation_info["epoch-num"];
    const snapshot_period = simulation_info["snapshot-period"];
    const nodeStates = simulation_info["states"];
    
    let curr_iteration = 0;  // Current iteration

    let hoveredData = null;
    let neighbors = new Set(); // Set to store neighbors of the hovered node

	let svg;
	let width = 1000;
	let height = 800;
    const nodeRadius = 5;
	const padding = { top: 20, right: 40, bottom: 40, left: 25 };

	let graph = data[curr_iteration];  // Initial graph data
    $: console.log("iteration:", curr_iteration, "graph:", graph);
	let links = graph.links.map(d => Object.create(d));
	let nodes = graph.nodes.map(d => Object.create(d));  

    // Setting color range for the nodes
    // Will be modified in later versions
    let colorRange = ['#0000ff', '#ff0000', '#00ff00'];
    // const nodeStates = ['Susceptible', 'Infected', 'Recovered'];
    let currentColor = null;
    
    // Color scale
    const colorScale = scaleOrdinal()
        .domain(nodeStates)
        .range(colorRange);

    const scaleX = scaleLinear().domain([0, width]).range([nodeRadius, width - nodeRadius]);
	const scaleY = scaleLinear().domain([0, height]).range([nodeRadius, height - nodeRadius]);

	let transform = d3.zoomIdentity;
    let simulation;

	onMount(() => {
		initializeSimulation();
	});

	function initializeSimulation() {
		simulation = d3.forceSimulation(nodes)
			.force("link", d3.forceLink(links).id(d => d.id))
			.force("charge", d3.forceManyBody().strength(-110))
			.force("center", d3.forceCenter(width / 2, height / 2))
            .alpha(0.3) // [0,1] how much movement, how fast
            .alphaDecay(.05)
			.on('tick', simulationUpdate);

		d3.select(svg)
			.call(d3.drag()
				.container(svg)
				.subject(dragsubject)
				.on("start", dragstarted)
				.on("drag", dragged)
				.on("end", dragended))
			.call(d3.zoom()
				.scaleExtent([1 / 10, 8])
				.on('zoom', zoomed));
	}

	function updateGraph() {
		graph = data[curr_iteration];
		links = graph.links.map(d => Object.create(d));
		nodes = graph.nodes.map(d => Object.create(d));
		simulation.nodes(nodes);
		simulation.force("link").links(links);
        simulation.alpha(0.3) // [0,1] how much movement, how fast
            .alphaDecay(.05)//[0, 1] the rate which alpha approaches zero. how long does it take btw simulation states
            .restart(); // Restart simulation with new data
	}

	function simulationUpdate () {
		simulation.tick();
        nodes.forEach(node => {
			node.x = scaleX(node.x);
			node.y = scaleY(node.y);
		});
		nodes = [...nodes];
		links = [...links];
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

	function changeIteration(delta) {
		// curr_iteration = (curr_iteration + delta + data.length) % data.length;  // Update iteration index
		curr_iteration = curr_iteration + delta;
        updateGraph();  // Update graph with new data
	}

    function getNeighbors(node) {
		const neighbors = new Set();
		links.forEach(link => {
			if (link.source.id === node.id) {
				neighbors.add(link.target.id);
			} else if (link.target.id === node.id) {
				neighbors.add(link.source.id);
			}
		});
		return neighbors;
	}

    
</script>

<svelte:window on:resize='{resize}'/>

<Container>
    <Row>
        <Col xs="9">
            <Row>
                <svg bind:this={svg} width='{width}' height='{height}'>
                    <g>
                        {#each links as link}
                            <line class='link 'x1='{link.source.x}' y1='{link.source.y}' 
                                    x2='{link.target.x}' y2='{link.target.y}'
                                    stroke-opacity={hoveredData ? (hoveredData.id === link.source.id || hoveredData.id === link.target.id) ? ".8" : ".3" : ".8"}
                                    transform='translate({transform.x} {transform.y}) scale({transform.k} {transform.k})'>
                                    <title>{link.source.id}</title>
                            </line>
                        {/each}
                
                        {#each nodes as point}
                            <circle class='node' 
                                    r='5'
                                    fill='{colorScale(point.node)}' 
                                    cx='{point.x}' 
                                    cy='{point.y}'
                                    opacity={hoveredData ? (hoveredData.id === point.id || neighbors.has(point.id)) ? "1" : ".3" : "1"}
                                    on:mouseover={() => {
                                        hoveredData = point;
                                        neighbors = getNeighbors(point);
                                    }}
                                    on:focus={() => {
                                        hoveredData = point;
                                        neighbors = getNeighbors(point);
                                    }}
                                    on:mouseleave={() => {
                                        hoveredData = null;
                                        neighbors = new Set();
                                    }}
                                    transform='translate({transform.x} {transform.y}) scale({transform.k} {transform.k})'>
                            <title>{point.id}</title></circle>
                        {/each}
                    </g>
                </svg>        
            </Row>
            <Row>
                <Col>
                    <Input class="slider" theme="dark" type="range" min={0} max={epoch_num-1} step={snapshot_period} placeholder="range placeholder" bind:value={curr_iteration} on:change={updateGraph}
                    style="-webkit-appearance: none;
                    width: 100%;
                    height: 20px;
                    background: #343a40;
                    outline: none;
                    opacity: 0.9;
                    transition: opacity .15s ease-in-out;"
                    />
                </Col>
                <Col>
                    <p>{curr_iteration}</p>
                </Col>
            </Row>
        </Col>
        <Col xs="3" theme="dark">
            <Row>
                <Card>
                    <CardHeader>
                    <CardTitle>Graph Info</CardTitle>
                    </CardHeader>
                    <CardBody>
                    <!-- <CardSubtitle></CardSubtitle> -->
                    <CardText>Nodes: {nodes.length}</CardText>
                    <CardText>Links: {links.length}</CardText>
                    </CardBody>
                    <!-- <CardFooter>Footer</CardFooter> -->
              </Card>
            </Row>
            <Row>
                <Card body color="light">
                    <CardHeader>
                    <CardTitle>Graph settings</CardTitle>
                    </CardHeader>
                    <CardBody>
                    <!-- <CardSubtitle></CardSubtitle> -->
                    {#each nodeStates as nodeState}
                        <label for={"color" + nodeState}>{nodeState}</label>
                        <Input type="color" id={"color" + nodeState} placeholder="color-placeholder" value={colorScale(nodeState)}/>
                    {/each}
                    </CardBody>
                    <!-- <CardFooter>Footer</CardFooter> -->
              </Card>
            </Row>
            
              
        </Col>
    </Row>
    
</Container>


<style>
	svg {
		float: left;
        border: 1px solid black
	}

	circle {
		stroke: #060606;
        stroke-width: 1;
	}

    line {
        stroke: #999;
    }

</style>
