<script>
  import ChartContainer from "./Chart/ChartContainer.svelte";
  import status_delta from "$data/status_delta2.js";
  import simulation_info from "$data/simulation_info.json";
  import { Col, Container, Row} from "@sveltestrap/sveltestrap";
  import { Button, Modal, ModalBody, ModalFooter, Input } from "@sveltestrap/sveltestrap";

  //getting simulation info
  const nodeStates = simulation_info["states"];
  const methods_from_simulation = Object.keys(simulation_info["watch-methods"]);

  //imported data that can be used to draw charts
  const data_opt = ["status delta", "parameters"];
  let data_selected;
  let axis_opt = [];
  let currLine; 
  let selectedY = "";
  let yDict = new Map(); //structure: {"line-1": "Susceptible", "line-2": "Infected"} etc 

  //these variables will be sent to the chart component
  let data_to_send = null;
  let xVar = ""; //x axis chosen
  let yVars = Array.from(yDict.values()); //variables chosen, which are the values in yDict
  let xTitle;
  let yTitle;
  let chartTitle;

  //run whenever data selected changes
  $: {
    if (data_selected === "status delta"){
      axis_opt = Object.keys(status_delta[0]);
      data_to_send = status_delta;
    }
    else if(data_selected === "parameters"){
      axis_opt = methods_from_simulation;
      data_to_send = simulation_info;
    }
    // console.log(axis_opt);
  }

  //run whenever selectedY changes
  // $: addYToList();

  //debug
  // $: console.log("yVars:", yVars);
  // $: console.log("currLine", currLine);
  // $: console.log("selected Y", selectedY);
  // for (const [key, value] of yDict) {
    //   console.log(`${key} goes ${value}`);
    // }
    // $: console.log("xVar:", xVar);

  const addYToList = (id) => {
    selectedY = document.getElementById("variable-selector-" + id).value;
    if(currLine !== undefined && selectedY !== ""){
      yDict.set(currLine, selectedY);
      yVars = Array.from(yDict.values());
    }
  } 

  const removeFromYList = (id) => {
    let keyToRemove = "line-" + id;
    yDict.delete(keyToRemove);
    yVars = Array.from(yDict.values());
  }

  //controls for adding chart modal
  let addChartOpen = false;
  const addChartToggle = () => {
    addChartOpen = !addChartOpen;
    clearLineData();
  };

  //clear all the variables we have used to draw the most recent chart
  const clearLineData = () => {
    lines = [];
    lineId = 0;

    axis_opt = [];
    data_selected = "";
    currLine = null;
    selectedY = "";
    yDict = new Map();

    data_to_send = null;
    xVar = "";
    yVars = [];
    xTitle = "";
    yTitle = "";
    chartTitle = "";
  }

  //Add lines logic here
  let lines = [];
  $: console.log(lines);
  let lineId = 0;

  const addLine = () => {
    lines = [...lines, { id: lineId }];
    lineId += 1;
  };

  const removeLine = (id) => {
    lines = lines.filter(line => line.id !== id);
    removeFromYList(id);
  };

  // Add charts logic here
  let charts = [];
  let chartId = 0;

  const addChart = () => {
    charts = [...charts, { 
      id: chartId,
      type: "lineChart",
      chartProps: { 
        chartWidth: 600, 
        chartHeight: 500, 
        data: data_to_send, 
        xVar: xVar, 
        yVars: [...yVars], 
        id: chartId,
        xTitle: xTitle,
        yTitle: yTitle,
        chartTitle: chartTitle
      }
    }];
    chartId += 1;
  }

  const removeChart = (id) => {
    charts = charts.filter(chart => chart.id !== id);
  }

  // Helper function to split charts into rows of two
  function chunkArray(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }

</script>
  
  <div>
    <h2>Results</h2>
    <p>
      {#if charts.length === 0}
        Start visualizing your results by adding charts.
      {:else}
        Analyze your charts below.
      {/if}
    </p>

    <Button color="danger" on:click={addChartToggle}>Add Chart</Button>
    <Modal body header="Add chart" isOpen={addChartOpen} toggle={addChartToggle}>
      <ModalBody>
        <p>Choose the information for the chart and we will create it for you!</p>
        <Row>
          <Col>
            <label for="data-selector">Choose data: </label>
          </Col>
          <Col>
            <Input type="select" id="data-selector" bind:value={data_selected}>
              <option value="" disabled selected>Select one</option>
              {#each data_opt as option}
                <option value={option}>{option}</option>
              {/each}
            </Input>
          </Col>
        </Row>
        <br>
        <Row>
          <Col>
            <label for="x-selector">Choose x axis: </label>
          </Col>
          <Col>
            <Input type="select" id="x-selector" bind:value={xVar}>
              <option value="" disabled selected>Select one</option>
              {#each axis_opt as option}
                <option value={option}>{option}</option>
              {/each}
            </Input>
          </Col>
        </Row>
        <br>
        <Row>
          <Col>
            <label for="chart-title">Enter a title for the chart:</label>
          </Col>
          <Col>
            <Input type="input" id="chart-title" bind:value={chartTitle} placeholder={"Simulation results"}/>
          </Col>
        </Row>
        <br>
        <Row>
          <Col>
            <label for="x-title">Enter a title for x axis:</label>
          </Col>
          <Col>
            <Input type="input" id="x-title" bind:value={xTitle} placeholder={"Epoch"}/>
          </Col>
        </Row>
        <br>

        <Row>
          <Col>
            <label for="y-title">Enter a title for y axis:</label>
          </Col>
          <Col>
            <Input type="input" id="y-title" bind:value={yTitle} placeholder="Node count"/>
          </Col>
        </Row>
        <br>

        <!-- <Row>
          <Col>
            <label for="variable-selector">Variable you want to visualize: </label>
          </Col>
          <Col>
            <Input type="select" id="variable-selector">
              {#each methods_from_simulation as option}
                <option>{option}</option>
              {/each}
            </Input>
          </Col>
        </Row> -->
        <!-- <br> -->
        <div>
          <Button outline color="success" on:click={addLine}>Add variable on chart</Button>
          <div id="add-lines-div">
            {#each lines as line (line.id)}
            <hr />
              <div id={`line-${line.id}`}>
                <Row>
                  <Col>
                    <label for={`variable-selector-${line.id}`}>Other variable: </label>
                  </Col>
                  <Col>
                    <Input type="select" id={`variable-selector-${line.id}`} on:input={() => {currLine=`line-${line.id}`; addYToList(line.id);}}>
                      <option value="" disabled selected>Select one</option>
                      {#each axis_opt as option}
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
        </div>

      </ModalBody>
      <ModalFooter>
        <Button color="primary" on:click={() => {addChart(); addChartToggle();}}>Draw Chart</Button>
        <Button color="secondary" on:click={addChartToggle}>Cancel</Button>
      </ModalFooter>
    </Modal>

    <Container>
      {#each chunkArray(charts, 2) as row}
        <Row>
          {#each row as chart}
            <Col>
              <ChartContainer type={chart.type} chartProps={chart.chartProps} />
            </Col>
          {/each}
        </Row>
        <br>
      {/each}
    </Container>
  </div>
  