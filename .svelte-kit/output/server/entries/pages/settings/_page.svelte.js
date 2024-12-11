import { c as create_ssr_component, d as subscribe, v as validate_component, i as escape } from "../../../chunks/ssr.js";
import { B as Button } from "../../../chunks/Button.js";
import { L as Label } from "../../../chunks/Label.js";
import { M as Modal, I as Input } from "../../../chunks/Modal.js";
import { H as Heading } from "../../../chunks/Heading.js";
import { P } from "../../../chunks/P.js";
import { S as Span } from "../../../chunks/Span.js";
import "yaml";
import "@tauri-apps/api/tauri";
import { p as project, s as simulationName } from "../../../chunks/projects.js";
import "../../../chunks/client.js";
import { A as ArrowRightOutline } from "../../../chunks/ArrowRightOutline.js";
const css = {
  code: "#editor.svelte-1hldlb7{width:100%;height:80vh;border:1px solid #ddd;margin-bottom:20px}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\r\\n\\timport { onMount } from 'svelte';\\r\\n\\timport { EditorState } from '@codemirror/state';\\r\\n\\timport { EditorView, keymap } from '@codemirror/view';\\r\\n\\timport { basicSetup } from 'codemirror';\\r\\n\\timport { indentWithTab } from '@codemirror/commands';\\r\\n\\timport { yaml } from '@codemirror/lang-yaml';\\r\\n\\timport { Button, Heading, Input, Label, Modal, P, Span, Spinner } from 'flowbite-svelte';\\r\\n\\timport YAML from 'yaml'; // Import the yaml library\\r\\n\\r\\n\\timport { invoke } from '@tauri-apps/api/tauri';\\r\\n\\timport { project, simulationName, simulationDirectory } from '$lib/stores/projects';\\r\\n\\timport { generateSlug } from '$lib/utils';\\r\\n\\timport { goto } from '$app/navigation';\\r\\n\\timport { ArrowRightOutline } from 'flowbite-svelte-icons';\\r\\n\\r\\n\\tlet editor;\\r\\n\\tlet yamlContent = '';\\r\\n\\tlet nameValue = '';\\r\\n\\r\\n\\tlet isSimulationRunning = false;\\r\\n\\tlet runSimOpen = false;\\r\\n\\tlet epochs = '0';\\r\\n\\tlet snapshotPeriod = '0';\\r\\n\\r\\n\\tonMount(async () => {\\r\\n\\t\\t// Load the initial YAML content from the file\\r\\n\\t\\tconst result = await invoke('run_python_get_conf', {\\r\\n\\t\\t\\tproject_name: $project.name\\r\\n\\t\\t});\\r\\n\\t\\tyamlContent = JSON.parse(result);\\r\\n\\r\\n\\t\\tconsole.log(yamlContent);\\r\\n\\t\\t// Initialize the CodeMirror editor\\r\\n\\t\\teditor = new EditorView({\\r\\n\\t\\t\\tstate: EditorState.create({\\r\\n\\t\\t\\t\\tdoc: yamlContent,\\r\\n\\t\\t\\t\\textensions: [basicSetup, yaml(), keymap.of([indentWithTab])]\\r\\n\\t\\t\\t}),\\r\\n\\t\\t\\tparent: document.querySelector('#editor')\\r\\n\\t\\t});\\r\\n\\t});\\r\\n\\r\\n\\tasync function runSimulation() {\\r\\n\\t\\ttry {\\r\\n\\t\\t\\tisSimulationRunning = true;\\r\\n\\t\\t\\tlet response = await invoke('run_python_init_and_run_simulation', {\\r\\n\\t\\t\\t\\tproject_name: $project.name,\\r\\n\\t\\t\\t\\tepochs: parseInt(epochs),\\r\\n\\t\\t\\t\\tsnapshot_period: parseInt(snapshotPeriod)\\r\\n\\t\\t\\t});\\r\\n\\t\\t\\tlet simulationDir = JSON.parse(response);\\r\\n\\t\\t\\tconsole.log(\\r\\n\\t\\t\\t\\t'Simulation ran successfully and here is the simulation directory:',\\r\\n\\t\\t\\t\\tsimulationDir\\r\\n\\t\\t\\t);\\r\\n\\r\\n\\t\\t\\t// Parse editor's content to extract the name value\\r\\n\\t\\t\\tparseYamlContent();\\r\\n\\r\\n\\t\\t\\t// Set the simulation name and directory stores\\r\\n\\t\\t\\t// This will be used in graph and results pages\\r\\n\\t\\t\\tsimulationDirectory.set(simulationDir);\\r\\n\\t\\t\\tsimulationName.set(nameValue);\\r\\n\\r\\n\\t\\t\\tisSimulationRunning = false;\\r\\n\\r\\n\\t\\t\\t// Ensure the simulation_name is correct\\r\\n\\t\\t\\tconst targetUrl = '/graph/' + generateSlug($simulationName);\\r\\n\\t\\t\\tconsole.log('Navigating to:', targetUrl);\\r\\n\\r\\n\\t\\t\\t// Go to the page of visualization of the resulting graph\\r\\n\\t\\t\\tgoto(targetUrl); // Optionally await to ensure navigation happens\\r\\n\\t\\t} catch (error) {\\r\\n\\t\\t\\tconsole.error('Error running simulation:', error);\\r\\n\\t\\t}\\r\\n\\t}\\r\\n\\r\\n\\tfunction parseYamlContent() {\\r\\n\\t\\ttry {\\r\\n\\t\\t\\tconst parsedYaml = YAML.parse(editor.state.doc.toString());\\r\\n\\t\\t\\tnameValue = parsedYaml.name || 'Name key not found';\\r\\n\\t\\t\\tconsole.log('Name Value:', nameValue);\\r\\n\\t\\t} catch (error) {\\r\\n\\t\\t\\tconsole.error('Error parsing YAML content:', error);\\r\\n\\t\\t}\\r\\n\\t}\\r\\n\\r\\n\\tasync function saveYaml() {\\r\\n\\t\\tconst content = editor.state.doc.toString();\\r\\n\\t\\ttry {\\r\\n\\t\\t\\t// Use tauri function to connect to Python backend and save YAML content\\r\\n\\t\\t\\tawait invoke('run_python_save_conf', {\\r\\n\\t\\t\\t\\tproject_name: $project.name,\\r\\n\\t\\t\\t\\tcontent: content\\r\\n\\t\\t\\t});\\r\\n\\t\\t\\tconsole.log('Configuration saved successfully');\\r\\n\\t\\t} catch (error) {\\r\\n\\t\\t\\tconsole.error('Error saving configuration:', error);\\r\\n\\t\\t}\\r\\n\\t}\\r\\n\\r\\n\\tfunction downloadYaml() {\\r\\n\\t\\tconst content = editor.state.doc.toString();\\r\\n\\t\\tconst blob = new Blob([content], { type: 'application/yaml' });\\r\\n\\t\\tconst url = URL.createObjectURL(blob);\\r\\n\\t\\tconst a = document.createElement('a');\\r\\n\\t\\ta.href = url;\\r\\n\\t\\ta.download = 'conf.yaml';\\r\\n\\t\\tdocument.body.appendChild(a);\\r\\n\\t\\ta.click();\\r\\n\\t\\tdocument.body.removeChild(a);\\r\\n\\t\\tURL.revokeObjectURL(url);\\r\\n\\t}\\r\\n<\/script>\\r\\n\\r\\n<div class=\\"text-center\\">\\r\\n\\t<Heading tag=\\"h1\\" class=\\"mb-4\\" customSize=\\"text-4xl font-extrabold  md:text-5xl lg:text-6xl\\">\\r\\n\\t\\tSettings\\r\\n\\t</Heading>\\r\\n\\r\\n\\t<Heading tag=\\"h6\\">\\r\\n\\t\\tProject: <Span gradient>{$project.name}</Span>\\r\\n\\t</Heading>\\r\\n\\t<P class=\\"my-2 text-center text-gray-600 dark:text-gray-400 sm:px-16 lg:text-lg xl:px-24\\">\\r\\n\\t\\tPut all project settings in a yaml file instead of Projects page\\r\\n\\t</P>\\r\\n</div>\\r\\n<div class=\\"mx-20 my-10\\">\\r\\n\\t<Button on:click={saveYaml} class=\\"mb-4\\">Save Configuration</Button>\\r\\n\\t<Button on:click={downloadYaml} class=\\"mb-4\\">Download Configuration</Button>\\r\\n\\t{#if isSimulationRunning}\\r\\n\\t\\t<Button class=\\"mb-4\\" on:click={() => (runSimOpen = true)}\\r\\n\\t\\t\\t><Spinner type=\\"border\\" color=\\"white\\" size=\\"5\\" />Run Simulation</Button\\r\\n\\t\\t>{:else}\\r\\n\\t\\t<Button class=\\"mb-4\\" on:click={() => (runSimOpen = true)}>Run Simulation</Button>{/if}\\r\\n\\t<div id=\\"editor\\"></div>\\r\\n</div>\\r\\n\\r\\n<Modal bind:open={runSimOpen} size=\\"xs\\" autoclose={false} class=\\"w-full\\">\\r\\n\\t<form class=\\"flex flex-col space-y-6\\">\\r\\n\\t\\t<h3 class=\\"mb-4 text-xl font-medium text-gray-900 dark:text-white\\">Add project</h3>\\r\\n\\t\\t<Label class=\\"space-y-2\\">\\r\\n\\t\\t\\t<span>Number of epochs to run:</span>\\r\\n\\t\\t\\t<Input placeholder=\\"Enter an integer\\" required bind:value={epochs} />\\r\\n\\t\\t</Label>\\r\\n\\t\\t<Label class=\\"space-y-2\\">\\r\\n\\t\\t\\t<span>Snapshot period:</span>\\r\\n\\t\\t\\t<Input placeholder=\\"Enter an integer\\" required bind:value={snapshotPeriod} />\\r\\n\\t\\t</Label>\\r\\n\\t\\t<Button class=\\"w-full1\\" on:click={runSimulation}>\\r\\n\\t\\t\\tRun simulation<ArrowRightOutline class=\\"ms-2 h-6 w-6\\" />\\r\\n\\t\\t</Button>\\r\\n\\t</form>\\r\\n</Modal>\\r\\n\\r\\n<style>\\r\\n\\t#editor {\\r\\n\\t\\twidth: 100%;\\r\\n\\t\\theight: 80vh;\\r\\n\\t\\tborder: 1px solid #ddd;\\r\\n\\t\\tmargin-bottom: 20px;\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AA6JC,sBAAQ,CACP,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,CACtB,aAAa,CAAE,IAChB"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $project, $$unsubscribe_project;
  let $$unsubscribe_simulationName;
  $$unsubscribe_project = subscribe(project, (value) => $project = value);
  $$unsubscribe_simulationName = subscribe(simulationName, (value) => value);
  let runSimOpen = false;
  let epochs = "0";
  let snapshotPeriod = "0";
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="text-center">${validate_component(Heading, "Heading").$$render(
      $$result,
      {
        tag: "h1",
        class: "mb-4",
        customSize: "text-4xl font-extrabold  md:text-5xl lg:text-6xl"
      },
      {},
      {
        default: () => {
          return `Settings`;
        }
      }
    )} ${validate_component(Heading, "Heading").$$render($$result, { tag: "h6" }, {}, {
      default: () => {
        return `Project: ${validate_component(Span, "Span").$$render($$result, { gradient: true }, {}, {
          default: () => {
            return `${escape($project.name)}`;
          }
        })}`;
      }
    })} ${validate_component(P, "P").$$render(
      $$result,
      {
        class: "my-2 text-center text-gray-600 dark:text-gray-400 sm:px-16 lg:text-lg xl:px-24"
      },
      {},
      {
        default: () => {
          return `Put all project settings in a yaml file instead of Projects page`;
        }
      }
    )}</div> <div class="mx-20 my-10">${validate_component(Button, "Button").$$render($$result, { class: "mb-4" }, {}, {
      default: () => {
        return `Save Configuration`;
      }
    })} ${validate_component(Button, "Button").$$render($$result, { class: "mb-4" }, {}, {
      default: () => {
        return `Download Configuration`;
      }
    })} ${`${validate_component(Button, "Button").$$render($$result, { class: "mb-4" }, {}, {
      default: () => {
        return `Run Simulation`;
      }
    })}`} <div id="editor" class="svelte-1hldlb7"></div></div> ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        size: "xs",
        autoclose: false,
        class: "w-full",
        open: runSimOpen
      },
      {
        open: ($$value) => {
          runSimOpen = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<form class="flex flex-col space-y-6"><h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white" data-svelte-h="svelte-97p7ey">Add project</h3> ${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
            default: () => {
              return `<span data-svelte-h="svelte-1yhy63s">Number of epochs to run:</span> ${validate_component(Input, "Input").$$render(
                $$result,
                {
                  placeholder: "Enter an integer",
                  required: true,
                  value: epochs
                },
                {
                  value: ($$value) => {
                    epochs = $$value;
                    $$settled = false;
                  }
                },
                {}
              )}`;
            }
          })} ${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
            default: () => {
              return `<span data-svelte-h="svelte-1ui00sn">Snapshot period:</span> ${validate_component(Input, "Input").$$render(
                $$result,
                {
                  placeholder: "Enter an integer",
                  required: true,
                  value: snapshotPeriod
                },
                {
                  value: ($$value) => {
                    snapshotPeriod = $$value;
                    $$settled = false;
                  }
                },
                {}
              )}`;
            }
          })} ${validate_component(Button, "Button").$$render($$result, { class: "w-full1" }, {}, {
            default: () => {
              return `Run simulation${validate_component(ArrowRightOutline, "ArrowRightOutline").$$render($$result, { class: "ms-2 h-6 w-6" }, {}, {})}`;
            }
          })}</form>`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_project();
  $$unsubscribe_simulationName();
  return $$rendered;
});
export {
  Page as default
};
