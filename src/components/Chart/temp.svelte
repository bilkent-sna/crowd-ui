<script>
  import { onMount } from 'svelte';
  import { Button, Form, FormGroup, Label, Input, ListGroup, ListGroupItem } from '@sveltestrap/sveltestrap';

  let nodes = [];
  let edges = [];
  let compartments = [];
  let rules = [];
  let showNodeForm = false;
  let showEdgeForm = false;
  let showCompartmentForm = false;
  let showRuleForm = false;
  
  let node_parameter_type;
  let edge_parameter_type;

  let newNumericalNodeParameter = {
      name: "",
      range: [0, 100]
  };
  
  let newCategoricalParameter = {
      name: "",
      options: []
  };
  let newNumericalEdgeParameter = {
      name: "",
      value: 1
  };
  //??????????
  let newCompartment = {
      name: '', 
      type: '', 
      key: '' 
  };
  let newRule = {
      name: '', 
      state1: '', 
      state2: '', 
      compartment: ''
  };


  let compartmentOptions = [
      'node-stochastic',
      'node-categorical',
      'node-numerical-attribute',
      'node-numerical-variable',
      'node-threshold',
      'edge-categorical',
      'edge-numerical',
      'edge-stochastic',
      'count-down',
      'conditional composition'
  ];

  function addNode() {
      if(node_parameter_type === "numerical"){
          nodes.push(newNumericalNodeParameter);
      }
      else{
          nodes.push(newCategoricalParameter);
      }
      showNodeForm = false;
      console.log(nodes);
  }

  function addEdge() {
      if(edge_parameter_type === "numerical"){
          edges.push(newNumericalEdgeParameter);
      }
      else{
          edges.push(newCategoricalParameter);
      }
      edges.push({ name: '', type: 'numerical', range: [0, 100] });
      showEdgeForm = false;
  }

  function addCompartment() {
      compartments.push({ name: '', type: '', key: '' });
      showCompartmentForm = false;
  }

  function addRule() {
      rules.push({ name: '', state1: '', state2: '', compartment: '' });
      showRuleForm = false;
  }

  function handleSubmit() {
      // Save data or perform other actions
      console.log("Data saved!");
  }
</script>


  <h2>Nodes</h2>
  <ListGroup>
      {#each nodes as node, i}
          <ListGroupItem>{node.name}</ListGroupItem>
      {/each}
  </ListGroup>
  {#if showNodeForm}
  <FormGroup>
      <Label for="nodeType">Type</Label>
      <Input type="select" bind:value={node_parameter_type}>
          <option value="numerical">Numerical</option>
          <option value="categorical">Categorical</option>
      </Input>
      {#if node_parameter_type === 'numerical'}
          <Label for="nodeName">Name</Label>
          <Input type="text" bind:value={newNumericalNodeParameter.name} placeholder="age" />
          <Label for="range">Range</Label>
          <Input type="text" bind:value={newNumericalNodeParameter.range[0]} placeholder="0" />
          <Input type="text" bind:value={newNumericalNodeParameter.range[1]} placeholder="100" />
      {/if}
      {#if node_parameter_type === 'categorical'}
          <Label for="nodeName">Name</Label>
          <Input type="text" bind:value={newCategoricalParameter.name} placeholder="age" />
          <Label for="range">Range</Label>
          <Input type="text" bind:value={newCategoricalParameter.range[0]} placeholder="0" />
          <Input type="text" bind:value={newCategoricalParameter.range[1]} placeholder="100" />
      {/if}
      <Button on:click={addNode}>Save</Button>
  </FormGroup>
  {:else}
      <Button on:click={() => showNodeForm = true}>Add Node</Button>
  {/if}

  <!-- Repeat the pattern for other sections: Edges, Compartments, and Rules -->
  
  <h2>Edges</h2>
  <ListGroup>
      {#each edges as edge, i}
          <ListGroupItem>{edge.name}</ListGroupItem>
      {/each}
  </ListGroup>
  {#if showEdgeForm}
      <!-- Edge form -->
  {:else}
      <Button on:click={() => showEdgeForm = true}>Add Edge</Button>
  {/if}

  <!-- Compartments -->

  <h2>Compartments</h2>
  <ListGroup>
      {#each compartments as compartment, i}
          <ListGroupItem>{compartment.name}</ListGroupItem>
      {/each}
  </ListGroup>
  {#if showCompartmentForm}
      <!-- Compartment form -->
  {:else}
      <Button on:click={() => showCompartmentForm = true}>Add Compartment</Button>
  {/if}

  <!-- Rules -->

  <h2>Rules</h2>
  <ListGroup>
      {#each rules as rule, i}
          <ListGroupItem>{rule.name}</ListGroupItem>
      {/each}
  </ListGroup>
  {#if showRuleForm}
      <!-- Rule form -->
  {:else}
      <Button on:click={() => showRuleForm = true}>Add Rule</Button>
  {/if}

  <!-- Save button -->
  <Button on:click={handleSubmit}>Save</Button>

