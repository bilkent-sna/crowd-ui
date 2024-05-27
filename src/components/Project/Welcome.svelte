<script>
    import { Button } from "sveltestrap";
    import ListProjects from "./ListProjects.svelte";
</script>

<h1>Welcome to Crowd!</h1>

<p>Your recent projects:</p>
<Button>New Project</Button>
<br>
<ListProjects on:sectionChange/>