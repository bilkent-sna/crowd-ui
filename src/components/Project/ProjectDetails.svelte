<script>
  import { Accordion, AccordionItem } from "sveltestrap";
  import { ListGroup, ListGroupItem, Row, Col, Button, Container, Input } from "sveltestrap";
  import { createEventDispatcher } from 'svelte';
  import simulation_info from "$data/simulation_info.json";
  
  
  export let selectedProject = "";

  //TODO: read this with tauri fs
  let recent_simulations = ['2024-05-20=13.55', '2024-05-14=13-37']; 
  let dataSource;
  let uploadToggle = false; 
  let generateGraphToggle = false;
  let graphPath = "";
  let graphFileType;
  let hasHeader;
  let graphGenerateType;
  let graphGenerateDegree;
  let nodeTypes = simulation_info["states"]; 

  const dispatch = createEventDispatcher();

  function switchPage(simulationName) {
      dispatch('sectionChange', {
          newSection: 'network',
          selectedProject: simulationName
      });
  }
</script>

<h1>Project: {selectedProject}</h1>
<hr>

<Button>Run Simulation</Button>
<br>
<Accordion>
  <AccordionItem header="Recent Simulations">
    <Container sm><ListGroup>
      {#each recent_simulations as simulation}
        <ListGroupItem color="secondary">
          <Row>
              <Col>
                  <h5>{simulation}</h5>
                  <div>Ran for {simulation_info["epoch-num"]} epochs with states:</div>
                  <div>{simulation_info["states"]}</div>
              </Col>
              <Col sm={{ size: 'auto', offset: 1 }}>
                  <Button color="link" on:click={ () => switchPage(simulation)}>Go</Button>
              </Col>
          </Row>
        </ListGroupItem>
      {/each}
  
  </ListGroup>
  
    </Container>
  </AccordionItem>

  <AccordionItem header="Simulation Settings">
    <Container sm><ListGroup>
      <ListGroupItem color="secondary">
        <Row>
            <Col>
              <h6>Data source:</h6>
              <Input type="radio" bind:group={dataSource} value="upload-graph" label={"Upload graph"} on:input={() => {uploadToggle = true; generateGraphToggle = false}}/>
              <Input type="radio" bind:group={dataSource} value="generate-graph" label={"Generate graph"} on:input={() => {uploadToggle = false; generateGraphToggle = true}}/>
              {#if uploadToggle}
              <br>
              <Row>Supported file extensions: CSV, edgelist</Row>
              <br>
              <Row>
                <Col>
                  <label for="graph-path">Enter the path for your data:</label>
                </Col>
                <Col>
                  <Input type="input" id="graph-path" bind:value={graphPath} placeholder={"/data/graph.csv"}/>
                </Col>
              </Row>
              <br>
              <Row>
                <Col>
                  <label for="graph-file-type">The file includes:</label>
                </Col>
                <Col id="graph-file-type">
                  <Input type="radio" bind:group={graphFileType} value="nodes_only" label={"Nodes only"} />
                  <Input type="radio" bind:group={graphFileType} value="nodes_edges" label={"Nodes and edges"} />
                   </Col>
              </Row>
              <br>
              <Row>
                <Col>
                  <label for="header-type">The file has header:</label>
                </Col>
                <Col id="header-type">
                  <Input type="radio" bind:group={hasHeader} value="true" label={"Yes"} />
                  <Input type="radio" bind:group={hasHeader} value="false" label={"No"} />
                  </Col>
              </Row>
              <br>
              {:else if generateGraphToggle}
                <Row>
                  <Col>
                    <label for="generate-type">Choose graph type: </label>
                  </Col>
                  <Col>
                    <Input type="select" id="generate-type" bind:value={graphGenerateType}>
                      <option value="" disabled selected>Select one</option>
                      {#each ["random", "barabasi-albert", "watts-strogatz"] as option}
                        <option value={option}>{option}</option>
                      {/each}
                    </Input>
                  </Col>
                </Row>
                <br>

                <Row>
                  <Col>
                    <label for="generate-degree">Choose graph type: </label>
                  </Col>
                  <Col>
                    <Input type="number" placeholder="4" id="generate-degree" bind:value={graphGenerateDegree}/>
                  </Col>
                </Row>
                <br>
              {/if}

              </Col>
            <Col sm={{ size: 'auto', offset: 1 }}>
                <Button color="link" on:click={ () => console.log("edit clicked")}>Edit</Button>
            </Col>
        </Row>
      </ListGroupItem>
      <ListGroupItem color="secondary">
        <Row>
            <!-- <Col>
              <h6>Node types:</h6>
              <div>
                <Button outline color="success" on:click={addLine}>Add variable on chart</Button>
                <div id="add-lines-div">
                  {#each nodeTypes as nodetype}
                  <hr />
                    <div id={`nodetype-${nodetype.id}`}>
                      <Row>
                        <Col>
                          <label for={`nodetype-selector-${nodetype.id}`}>Other variable: </label>
                        </Col>
                        <Col>
                          <Input type="select" id={`nodetype-selector-${nodetype.id}`} on:input={() => {currNodetype=`nodetype-${nodetype.id}`; addYToList(nodetype.id);}}>
                            <option value="" disabled selected>Select one</option>
                            {#each ["hello", "hi"] as option}
                              <option value={option}>{option}</option>
                            {/each}
                          </Input>
                        </Col>
                      </Row>
                      <Button color="link" on:click={() => removeLine(line.id)}>Remove Line</Button>
                      <hr />
                    </div>
                  {/each}
                </div>
           </Col>
            <Col sm={{ size: 'auto', offset: 1 }}>
                <Button color="link" on:click={ () => console.log("edit clicked")}>Edit</Button>
            </Col> -->
        </Row>
      </ListGroupItem>
      </ListGroup>
    </Container>
  </AccordionItem>
</Accordion>
