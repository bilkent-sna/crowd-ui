<script>
  import 'bootstrap/dist/css/bootstrap.min.css';
  import NetworkViz2 from "./components/NetworkViz2.svelte";

  // let curr_iteration = 0;
  // //todo: check number of iterations from data. dont allow increasing value above that
  // $: console.log(curr_iteration);

</script>


<!-- <button on:click={() => curr_iteration++}>+</button>
<div>{curr_iteration}</div>
<button on:click={() => curr_iteration--}>-</button> -->

<!-- <NetworkViz {curr_iteration}/> -->
<NetworkViz2 />