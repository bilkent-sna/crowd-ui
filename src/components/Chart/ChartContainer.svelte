<script>
  import DeltaGraph from "./Delta_Graph.svelte";
  import { Button, Container, Row, Col, Input } from 'sveltestrap';
  import ChartDownload from "./ChartDownload.svelte";

  export let type;
  export let chartProps;
  const CHART_TYPES = {
      lineChart: DeltaGraph,
  };

  let tooltip_switch = false;

  function getSVG(chartId) {
    return document.getElementById('svg-container-' + chartId);
  }
</script>

  <section class="container">
    <Row>
        <Col md-4>
        <Input type="switch" label="Show tooltip" bind:checked={tooltip_switch}/>
        </Col>
        <Col md-8><ChartDownload chartId={chartProps.id} {getSVG} /> </Col>
    </Row>
    <Row><svelte:component this={CHART_TYPES[type]} {...chartProps} {tooltip_switch}/></Row>
    </section>

<style>
  .container {
     max-width: 600px;
     border: solid 1px black;
     margin: auto;
  }
</style>