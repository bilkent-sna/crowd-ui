import { c as create_ssr_component, b as compute_rest_props, h as getContext, e as spread, f as escape_attribute_value, g as escape_object, a as add_attribute, i as escape, d as subscribe, v as validate_component } from "../../../../chunks/ssr.js";
import { H as Heading } from "../../../../chunks/Heading.js";
import { P } from "../../../../chunks/P.js";
import { M as Modal, E as ExclamationCircleOutline, S as Span } from "../../../../chunks/ExclamationCircleOutline.js";
import "@tauri-apps/api/tauri";
import { p as project, n as nodeOrEdge, b as simulationType } from "../../../../chunks/projects.js";
import { B as Button } from "../../../../chunks/Button.js";
import { A } from "../../../../chunks/A.js";
import { twMerge } from "tailwind-merge";
import "../../../../chunks/client.js";
const CirclePlusSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "role", "color", "withEvents", "title", "desc", "ariaLabel"]);
  const ctx = getContext("iconCtx") ?? {};
  const sizes = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8"
  };
  let { size = ctx.size || "md" } = $$props;
  let { role = ctx.role || "img" } = $$props;
  let { color = ctx.color || "currentColor" } = $$props;
  let { withEvents = ctx.withEvents || false } = $$props;
  let { title = {} } = $$props;
  let { desc = {} } = $$props;
  let ariaDescribedby = `${title.id || ""} ${desc.id || ""}`;
  let hasDescription = false;
  let { ariaLabel = "circle plus solid" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.role === void 0 && $$bindings.role && role !== void 0) $$bindings.role(role);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.withEvents === void 0 && $$bindings.withEvents && withEvents !== void 0) $$bindings.withEvents(withEvents);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.desc === void 0 && $$bindings.desc && desc !== void 0) $$bindings.desc(desc);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0) $$bindings.ariaLabel(ariaLabel);
  {
    if (title.id || desc.id) {
      hasDescription = true;
    } else {
      hasDescription = false;
    }
  }
  return `${withEvents ? `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: escape_attribute_value(color) },
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge("shrink-0", sizes[size ?? "md"], $$props.class))
      },
      { role: escape_attribute_value(role) },
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      {
        "aria-describedby": escape_attribute_value(hasDescription ? ariaDescribedby : void 0)
      },
      { viewBox: "0 0 24 24" }
    ],
    {}
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z" clip-rule="evenodd"></path></svg>` : `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: escape_attribute_value(color) },
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge("shrink-0", sizes[size ?? "md"], $$props.class))
      },
      { role: escape_attribute_value(role) },
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      {
        "aria-describedby": escape_attribute_value(hasDescription ? ariaDescribedby : void 0)
      },
      { viewBox: "0 0 24 24" }
    ],
    {}
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z" clip-rule="evenodd"></path></svg>`} `;
});
const SimulationsList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_project;
  $$unsubscribe_project = subscribe(project, (value) => value);
  let allSimulations = [];
  let errorModalOpen = false;
  let latestError = "error";
  let searchTerm = "";
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    allSimulations.filter((item) => item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    $$rendered = `${`<div class="mx-20 my-4">${validate_component(A, "A").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(CirclePlusSolid, "CirclePlusSolid").$$render($$result, { class: "h-6 w-6" }, {}, {})} Show all simulations`;
      }
    })}</div>`} ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        size: "xs",
        autoclose: true,
        open: errorModalOpen
      },
      {
        open: ($$value) => {
          errorModalOpen = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<div class="text-center">${validate_component(ExclamationCircleOutline, "ExclamationCircleOutline").$$render(
            $$result,
            {
              class: "mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200"
            },
            {},
            {}
          )} <h3 class="mb-1 text-xl font-normal text-gray-800 dark:text-gray-400" data-svelte-h="svelte-2e0vep">Error:</h3> ${validate_component(P, "P").$$render(
            $$result,
            {
              class: "mb-5 text-center text-lg font-normal text-gray-700 dark:text-gray-400"
            },
            {},
            {
              default: () => {
                return `${escape(latestError)}`;
              }
            }
          )} ${validate_component(Button, "Button").$$render($$result, { color: "red", class: "me-2" }, {}, {
            default: () => {
              return `Try again`;
            }
          })}</div>`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_project();
  return $$rendered;
});
const SimulationSettings = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_nodeOrEdge;
  let $$unsubscribe_project;
  $$unsubscribe_nodeOrEdge = subscribe(nodeOrEdge, (value) => value);
  $$unsubscribe_project = subscribe(project, (value) => value);
  let simType = "false";
  let isDiffusion = true;
  let errorModalOpen = false;
  let latestError = "error";
  let dataFromChildren = {};
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    isDiffusion = simType === "true";
    {
      console.log(isDiffusion);
    }
    {
      {
        if (isDiffusion) {
          simulationType.set("diffusion");
        } else {
          simulationType.set("other");
        }
      }
    }
    {
      console.log("dict:", dataFromChildren);
    }
    $$rendered = `${`<div class="mx-20 my-4">${validate_component(A, "A").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(CirclePlusSolid, "CirclePlusSolid").$$render($$result, { class: "h-6 w-6" }, {}, {})} Show simulation settings`;
      }
    })}</div>`} ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        size: "xs",
        autoclose: true,
        open: errorModalOpen
      },
      {
        open: ($$value) => {
          errorModalOpen = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<div class="text-center">${validate_component(ExclamationCircleOutline, "ExclamationCircleOutline").$$render(
            $$result,
            {
              class: "mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200"
            },
            {},
            {}
          )} <h3 class="mb-1 text-xl font-normal text-gray-800 dark:text-gray-400" data-svelte-h="svelte-2e0vep">Error:</h3> ${validate_component(P, "P").$$render(
            $$result,
            {
              class: "mb-5 text-center text-lg font-normal text-gray-700 dark:text-gray-400"
            },
            {},
            {
              default: () => {
                return `${escape(latestError)}`;
              }
            }
          )} ${validate_component(Button, "Button").$$render($$result, { color: "red", class: "me-2" }, {}, {
            default: () => {
              return `Try again`;
            }
          })}</div>`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_nodeOrEdge();
  $$unsubscribe_project();
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $project, $$unsubscribe_project;
  $$unsubscribe_project = subscribe(project, (value) => $project = value);
  $$unsubscribe_project();
  return `${`<div class="text-center">${validate_component(Heading, "Heading").$$render(
    $$result,
    {
      tag: "h1",
      class: "mb-4",
      customSize: "text-3xl font-bold  md:text-4xl lg:text-5xl"
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
        return `${escape($project.info)}`;
      }
    }
  )}</div>`} ${validate_component(SimulationsList, "SimulationsList").$$render($$result, {}, {}, {})} ${validate_component(SimulationSettings, "SimulationSettings").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
