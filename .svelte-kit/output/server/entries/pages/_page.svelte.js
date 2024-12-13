import { c as create_ssr_component, s as setContext, a as add_attribute, h as getContext, i as escape, b as compute_rest_props, e as spread, f as escape_attribute_value, g as escape_object, v as validate_component, j as each } from "../../chunks/ssr.js";
import { B as Button } from "../../chunks/Button.js";
import { R as Radio } from "../../chunks/Radio.js";
import { L as Label } from "../../chunks/Label.js";
import { M as Modal, I as Input } from "../../chunks/Modal.js";
import { H as Heading } from "../../chunks/Heading.js";
import { P } from "../../chunks/P.js";
import { S as Span } from "../../chunks/Span.js";
import { A as ArrowRightOutline } from "../../chunks/ArrowRightOutline.js";
import "@tauri-apps/api/tauri";
import "../../chunks/client.js";
import { twMerge } from "tailwind-merge";
import { A } from "../../chunks/A.js";
const Timeline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { order = "default" } = $$props;
  setContext("order", order);
  let olClasses = {
    group: "p-5 mb-4 bg-gray-50 rounded-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700",
    horizontal: "sm:flex",
    activity: "relative border-s border-gray-200 dark:border-gray-700",
    vertical: "relative border-s border-gray-200 dark:border-gray-700",
    default: "relative border-s border-gray-200 dark:border-gray-700"
  };
  if ($$props.order === void 0 && $$bindings.order && order !== void 0) $$bindings.order(order);
  return `<ol${add_attribute("class", twMerge(olClasses[order], $$props.class), 0)}>${slots.default ? slots.default({}) : ``}</ol> `;
});
const TimelineItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { date = "" } = $$props;
  let { svgClass = "w-3 h-3 text-primary-600 dark:text-primary-400" } = $$props;
  let order = "default";
  order = getContext("order");
  const liClasses = {
    default: "mb-10 ms-4",
    vertical: "mb-10 ms-6",
    horizontal: "relative mb-6 sm:mb-0",
    activity: "mb-10 ms-6",
    group: ""
  };
  const divClasses = {
    default: "absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700",
    vertical: "flex absolute -start-3 justify-center items-center w-6 h-6 bg-primary-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-primary-900",
    horizontal: "flex items-center",
    activity: "flex absolute -start-3 justify-center items-center w-6 h-6 bg-primary-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-primary-900",
    group: "p-5 mb-4 bg-gray-50 rounded-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700"
  };
  const timeClasses = {
    default: "mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500",
    vertical: "block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500",
    horizontal: "block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500",
    activity: "mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0",
    group: "text-lg font-semibold text-gray-900 dark:text-white"
  };
  let liCls = twMerge(liClasses[order], $$props.classLi);
  let divCls = twMerge(divClasses[order], $$props.classDiv);
  let timeCls = twMerge(timeClasses[order], $$props.classTime);
  const h3Cls = twMerge(
    order === "vertical" ? "flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white" : "text-lg font-semibold text-gray-900 dark:text-white",
    $$props.classH3
  );
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.date === void 0 && $$bindings.date && date !== void 0) $$bindings.date(date);
  if ($$props.svgClass === void 0 && $$bindings.svgClass && svgClass !== void 0) $$bindings.svgClass(svgClass);
  return `<li${add_attribute("class", liCls, 0)}><div${add_attribute("class", divCls, 0)}></div> ${order !== "default" ? `${slots.icon ? slots.icon({}) : ` <svg aria-hidden="true"${add_attribute("class", svgClass, 0)} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg> `}` : `${date ? `<time${add_attribute("class", timeCls, 0)}>${escape(date)}</time>` : ``}`} ${title ? `<h3${add_attribute("class", h3Cls, 0)}>${escape(title)}</h3>` : ``} ${order !== "default" ? `${date ? `<time${add_attribute("class", timeCls, 0)}>${escape(date)}</time>` : ``}` : ``} ${slots.default ? slots.default({}) : ``}</li> `;
});
const CalendarWeekSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "calendar week solid" } = $$props;
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path fill-rule="evenodd" d="M6 5V4a1 1 0 1 1 2 0v1h3V4a1 1 0 1 1 2 0v1h3V4a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v2H3V7a2 2 0 0 1 2-2h1ZM3 19v-8h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm5-6a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8Z" clip-rule="evenodd"></path></svg>` : `<svg${spread(
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path fill-rule="evenodd" d="M6 5V4a1 1 0 1 1 2 0v1h3V4a1 1 0 1 1 2 0v1h3V4a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v2H3V7a2 2 0 0 1 2-2h1ZM3 19v-8h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm5-6a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8Z" clip-rule="evenodd"></path></svg>`} `;
});
function generateSlug(str) {
  return str.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
}
const ListProjects = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let allProjects = [];
  return `<div class="flex items-center justify-center"><div class="m-5 w-1/2 items-center gap-2 p-1">${validate_component(Timeline, "Timeline").$$render($$result, { order: "vertical" }, {}, {
    default: () => {
      return `${each(allProjects, (currProject) => {
        return `${validate_component(TimelineItem, "TimelineItem").$$render($$result, {}, {}, {
          icon: () => {
            return `<span class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-200 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-900">${validate_component(CalendarWeekSolid, "CalendarWeekSolid").$$render(
              $$result,
              {
                class: "h-4 w-4 text-primary-600 dark:text-primary-400"
              },
              {},
              {}
            )}</span> `;
          },
          default: () => {
            return `${validate_component(A, "A").$$render(
              $$result,
              {
                href: `/project/${generateSlug(currProject.name)}`,
                class: "font-medium hover:underline"
              },
              {},
              {
                default: () => {
                  return ` ${escape(currProject.name)} `;
                }
              }
            )} <div class="text-gray-500 dark:text-gray-400"><p class="mb-4 text-base font-normal">${escape(currProject.date)}</p> <p class="mb-4 text-base font-normal">${escape(currProject.info)}</p></div> `;
          }
        })}`;
      })}`;
    }
  })}</div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let addProjectOpen = false;
  let newProjectName = "";
  let newProjectInfo = "";
  let nodeEdgeSelect = "";
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="container text-center">${validate_component(Heading, "Heading").$$render(
      $$result,
      {
        tag: "h1",
        class: "mb-4",
        customSize: "text-3xl font-bold  md:text-4xl lg:text-5xl"
      },
      {},
      {
        default: () => {
          return `Welcome to ${validate_component(Span, "Span").$$render($$result, { gradient: true }, {}, {
            default: () => {
              return `Crowd!`;
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
          return `Start by creating a new project or continue with an existing one.`;
        }
      }
    )} ${validate_component(Button, "Button").$$render($$result, {}, {}, {
      default: () => {
        return `Add project
		${validate_component(ArrowRightOutline, "ArrowRightOutline").$$render($$result, { class: "ms-2 h-6 w-6" }, {}, {})}`;
      }
    })}</div> ${validate_component(ListProjects, "ListProjects").$$render($$result, {}, {}, {})} ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        size: "xs",
        autoclose: false,
        class: "w-full",
        open: addProjectOpen
      },
      {
        open: ($$value) => {
          addProjectOpen = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<form class="flex flex-col space-y-6"><h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white" data-svelte-h="svelte-97p7ey">Add project</h3> ${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
            default: () => {
              return `<span data-svelte-h="svelte-1m4lzfb">Enter a name for the new project:</span> ${validate_component(Input, "Input").$$render(
                $$result,
                {
                  placeholder: "project name",
                  required: true,
                  value: newProjectName
                },
                {
                  value: ($$value) => {
                    newProjectName = $$value;
                    $$settled = false;
                  }
                },
                {}
              )}`;
            }
          })} ${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
            default: () => {
              return `<span data-svelte-h="svelte-3f5wvp">Add a description of your project:</span> ${validate_component(Input, "Input").$$render(
                $$result,
                {
                  placeholder: "Diffusion of flu virus in a random network",
                  required: true,
                  value: newProjectInfo
                },
                {
                  value: ($$value) => {
                    newProjectInfo = $$value;
                    $$settled = false;
                  }
                },
                {}
              )}`;
            }
          })} ${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
            default: () => {
              return `<span data-svelte-h="svelte-1a8ktuw">Project will be:</span> ${validate_component(Radio, "Radio").$$render(
                $$result,
                {
                  name: "node-diffusion",
                  value: "node",
                  group: nodeEdgeSelect
                },
                {
                  group: ($$value) => {
                    nodeEdgeSelect = $$value;
                    $$settled = false;
                  }
                },
                {
                  default: () => {
                    return `Node simulation`;
                  }
                }
              )} ${validate_component(Radio, "Radio").$$render(
                $$result,
                {
                  name: "edge-diffusion",
                  group: nodeEdgeSelect
                },
                {
                  group: ($$value) => {
                    nodeEdgeSelect = $$value;
                    $$settled = false;
                  }
                },
                {
                  default: () => {
                    return `Edge simulation`;
                  }
                }
              )}`;
            }
          })} ${validate_component(Button, "Button").$$render($$result, { class: "w-full1" }, {}, {
            default: () => {
              return `Create project${validate_component(ArrowRightOutline, "ArrowRightOutline").$$render($$result, { class: "ms-2 h-6 w-6" }, {}, {})}`;
            }
          })}</form>`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
