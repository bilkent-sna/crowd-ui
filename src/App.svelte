<script>
  
  //import bootstrap and its components
  import 'bootstrap/dist/css/bootstrap.min.css';
  import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, Container, Row, Col } from 'sveltestrap';
  
  //import main components. the switch between them will happen in this file.
  import Welcome from './components/Project/Welcome.svelte';
  import ProjectDetails from './components/Project/ProjectDetails.svelte';
  import Network from './components/Network.svelte';
  import Results from './components/Results.svelte';
  import Settings from './components/Settings.svelte';
  import MethodLab from './components/MethodLab/MethodLab.svelte';

  // let currentSection = 'network';
  let currentSection = 'welcome';
  let currentProject = '';
  let isOpen = false;

  function setSection(section) {
    currentSection = section;
  }

  function handleUpdate(event) {
    isOpen = event.detail.isOpen;
  }

  function handleTabChange(event){
    currentSection = event.detail.newSection;
    console.log("Current Section Changed!!!");
    currentProject = event.detail.selectedProject;
  }
</script>

<style>
  /* body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  } */
  .navbar-container {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
  }
  .content-container {
    margin-top: 56px; /* Height of the navbar */
    padding: 20px;
  }
</style>

<div class="navbar-container">
  <Navbar color="dark" dark expand="md" container="md">
    <NavbarBrand href="/">Crowd</NavbarBrand>
    <NavbarToggler on:click={() => (isOpen = !isOpen)} />
    <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
      <Nav class="ms-auto" navbar>
        <NavItem>
          <NavLink class="nav-link" active={currentSection === 'welcome'} on:click={() => setSection('welcome')}>
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink class="nav-link" active={currentSection === 'project'} on:click={() => setSection('project')}>
            Project
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink class="nav-link" active={currentSection === 'network'} on:click={() => setSection('network')}>
            Network
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink class="nav-link" active={currentSection === 'results'} on:click={() => setSection('results')}>
            Results
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink class="nav-link" active={currentSection === 'methods'} on:click={() => setSection('methods')}>
            Method Lab
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink class="nav-link" active={currentSection === 'settings'} on:click={() => setSection('settings')}>
            Settings
          </NavLink>
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar>
</div>

<div class="content-container">
  {#if currentSection === 'network'}
    <Network />
  {:else if currentSection === 'results'}
    <Results />
  {:else if currentSection === 'settings'}
    <Settings />
  {:else if currentSection === 'welcome'}
    <Welcome on:sectionChange={handleTabChange}/>
  {:else if currentSection === 'project'}
    <ProjectDetails on:sectionChange={handleTabChange} selectedProject={currentProject} />
  {:else if currentSection === 'methods'}
    <MethodLab />
  {/if}
</div>