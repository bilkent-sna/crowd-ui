import { c as create_ssr_component, h as subscribe, v as validate_component, j as escape } from "../../../../chunks/ssr.js";
import "@tauri-apps/api/tauri";
import { a as simulationDirectory, p as project, n as nodeOrEdge, s as simulationName } from "../../../../chunks/projects.js";
import { S as Spinner } from "../../../../chunks/Spinner.js";
import { H as Heading, S as Span } from "../../../../chunks/Span.js";
import { P } from "../../../../chunks/P.js";
import "d3-zoom";
import "file-saver";
import "gifshot";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_simulationDirectory;
  let $project, $$unsubscribe_project;
  let $$unsubscribe_nodeOrEdge;
  let $simulationName, $$unsubscribe_simulationName;
  $$unsubscribe_simulationDirectory = subscribe(simulationDirectory, (value) => value);
  $$unsubscribe_project = subscribe(project, (value) => $project = value);
  $$unsubscribe_nodeOrEdge = subscribe(nodeOrEdge, (value) => value);
  $$unsubscribe_simulationName = subscribe(simulationName, (value) => $simulationName = value);
  $$unsubscribe_simulationDirectory();
  $$unsubscribe_project();
  $$unsubscribe_nodeOrEdge();
  $$unsubscribe_simulationName();
  return `${`<div class="text-center">${validate_component(Heading, "Heading").$$render(
    $$result,
    {
      tag: "h1",
      class: "mb-4",
      customSize: "text-4xl font-extrabold  md:text-5xl lg:text-6xl"
    },
    {},
    {
      default: () => {
        return `Project: ${validate_component(Span, "Span").$$render($$result, { gradient: true }, {}, {
          default: () => {
            return `${escape($project.name)}`;
          }
        })}`;
      }
    }
  )} ${validate_component(P, "P").$$render(
    $$result,
    {
      class: "my-6 text-center text-lg dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48"
    },
    {},
    {
      default: () => {
        return `Simulation: ${escape($simulationName)}`;
      }
    }
  )} ${validate_component(Spinner, "Spinner").$$render($$result, { class: "mt-4", size: "10" }, {}, {})} ${validate_component(P, "P").$$render(
    $$result,
    {
      class: "my-2 text-center text-gray-400 dark:text-gray-400 sm:px-16 lg:text-lg xl:px-24"
    },
    {},
    {
      default: () => {
        return `Loading the project`;
      }
    }
  )}</div>`}`;
});
export {
  Page as default
};
