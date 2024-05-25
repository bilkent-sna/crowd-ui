<script>
  import 'bootstrap/dist/css/bootstrap.min.css';
  import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, Container, Row, Col } from 'sveltestrap';
  import Network from './components/Network.svelte';
  import Results from './components/Results.svelte';
  import Settings from './components/Settings.svelte';

  let currentSection = 'network';
  let isOpen = false;

  function setSection(section) {
    currentSection = section;
  }

  function handleUpdate(event) {
    isOpen = event.detail.isOpen;
  }
</script>

<style>
  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }
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
  .nav-link {
    color: #fff !important;
    cursor: pointer;
  }
  .nav-link.active {
    background-color: #495057 !important;
  }
</style>

<div class="navbar-container">
  <Navbar color="dark" dark expand="md" container="md">
    <NavbarBrand href="/">Crowd</NavbarBrand>
    <NavbarToggler on:click={() => (isOpen = !isOpen)} />
    <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
      <Nav class="ms-auto" navbar>
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
  {/if}
  {#if currentSection === 'results'}
    <Results />
  {/if}
  {#if currentSection === 'settings'}
    <Settings />
  {/if}
</div>