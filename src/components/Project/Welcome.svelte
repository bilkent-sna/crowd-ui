<script>
    import { Button, Modal, ModalBody, ModalFooter, Row, Col, Input } from "@sveltestrap/sveltestrap";
    import ListProjects from "./ListProjects0.svelte";
    import { createEventDispatcher } from 'svelte';

    let addProjectToggle = () => {
        addProjectOpen = !addProjectOpen;
    };
    let addProjectOpen = false;
    let newProjectName = "";

    const dispatch = createEventDispatcher();

    function switchPage() {
        dispatch('sectionChange', {
            newSection: 'project',
            selectedProject: newProjectName
        });
    }
</script>

<h1>Welcome to Crowd!</h1>

<p>Your recent projects:</p>
<Button color="danger" on:click={addProjectToggle}>New Project</Button>
<br>
<ListProjects on:sectionChange/>

<Modal body header="Add project" isOpen={addProjectOpen} toggle={addProjectToggle}>
  <ModalBody>
    <Row>
      <Col>
        <label for="project-name">Enter a name for the new project:</label>
      </Col>
      <Col>
        <Input type="input" id="project-name" bind:value={newProjectName} placeholder={"project1"}/>
      </Col>
    </Row>
    <br>
  </ModalBody>
  <ModalFooter>
    <Button color="primary" on:click={() => {addProjectToggle(); switchPage();}}>Create Project</Button>
    <Button color="secondary" on:click={addProjectToggle}>Cancel</Button>
  </ModalFooter>
</Modal>