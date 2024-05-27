<script>
    //this is the second main page that opens when user selects a project
    // import { readDir } from '@tauri-apps/api/fs';

    //Tauri FS module prevents path traversal, does not allow absolute paths
    //or parent dir components (i.e. "/usr/path/to/file" or "../path/to/file")

    //when we connect the app this shouldnt be an issue
    //For now, we copied projects folder here

    // async function loadProjects() {
    // try {
    //     const entries = await readDir('$APPDATA/data/', { recursive: false });
    //     projects = entries.map(entry => entry.name);
    // } catch (error) {
    //     console.error('Failed to read project directory:', error);
    // }
    // }

    // loadProjects();

    //TODO: LOAD PROJECT NAMES AND DETAILS WITH TAURI INSTEAD

    import { ListGroup, ListGroupItem, Row, Col, Button, Container } from "sveltestrap";
    import { createEventDispatcher } from 'svelte';

    let projects = ['test1', 'Project 2']; 

    const dispatch = createEventDispatcher();

    function switchPage(projectName) {
        dispatch('sectionChange', {
            newSection: 'project',
            selectedProject: projectName
        });
    }

</script>

<Container sm><ListGroup>
    {#each projects as project}
      <ListGroupItem color="secondary">
        <Row>
            <Col>
                <h5>{project}</h5>
                <div>This is a short description of the project.</div>
                <div>Last ran:</div>
            </Col>
            <Col sm={{ size: 'auto', offset: 1 }}>
                <Button color="link" on:click={ () => switchPage(project)}>Go</Button>
            </Col>
        </Row>
      </ListGroupItem>
    {/each}

</ListGroup>

  </Container>