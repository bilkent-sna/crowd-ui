import { c as create_ssr_component, a as add_attribute, b as compute_rest_props, d as subscribe, s as setContext, v as validate_component, e as spread, f as escape_attribute_value, g as escape_object, h as getContext } from "../../chunks/ssr.js";
/* empty css               */
import { T as ToolbarButton } from "../../chunks/ToolbarButton.js";
import { F as Frame } from "../../chunks/Frame.js";
import { twMerge } from "tailwind-merge";
import { w as writable } from "../../chunks/index.js";
import { i as is_void } from "../../chunks/names.js";
import "../../chunks/client.js";
import { p as project, s as simulationName } from "../../chunks/projects.js";
function quintOut(t) {
  return --t * t * t * t * t + 1;
}
const NavContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { fluid = false } = $$props;
  if ($$props.fluid === void 0 && $$bindings.fluid && fluid !== void 0) $$bindings.fluid(fluid);
  return `<div${add_attribute("class", twMerge("mx-auto flex flex-wrap justify-between items-center ", fluid ? "w-full" : "container", $$props.class), 0)}>${slots.default ? slots.default({}) : ``}</div> `;
});
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["fluid"]);
  let $hidden, $$unsubscribe_hidden;
  let { fluid = false } = $$props;
  let hidden = writable(true);
  $$unsubscribe_hidden = subscribe(hidden, (value) => $hidden = value);
  setContext("navHidden", hidden);
  let toggle = () => hidden.update((hidden2) => !hidden2);
  if ($$props.fluid === void 0 && $$bindings.fluid && fluid !== void 0) $$bindings.fluid(fluid);
  {
    {
      $$restProps.color = $$restProps.color ?? "navbar";
    }
  }
  $$unsubscribe_hidden();
  return `${validate_component(Frame, "Frame").$$render(
    $$result,
    Object.assign({}, { tag: "nav" }, $$restProps, {
      class: twMerge("px-2 sm:px-4 py-2.5 w-full", $$props.class)
    }),
    {},
    {
      default: () => {
        return `${validate_component(NavContainer, "NavContainer").$$render($$result, { fluid }, {}, {
          default: () => {
            return `${slots.default ? slots.default({ hidden: $hidden, toggle, NavContainer }) : ``}`;
          }
        })}`;
      }
    }
  )} `;
});
const NavBrand = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["href"]);
  let { href = "" } = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  return `<a${spread(
    [
      { href: escape_attribute_value(href) },
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge("flex items-center", $$props.class))
      }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</a> `;
});
const Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "color", "variation", "ariaLabel"]);
  let { size = "24" } = $$props;
  let { color = "currentColor" } = $$props;
  let { variation = "outline" } = $$props;
  let { ariaLabel = "bars 3" } = $$props;
  let viewBox;
  let svgpath;
  let svgoutline = `<path stroke="${color}" stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path> `;
  let svgsolid = `<path fill="${color}" clip-rule="evenodd" fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path> `;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.variation === void 0 && $$bindings.variation && variation !== void 0) $$bindings.variation(variation);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0) $$bindings.ariaLabel(ariaLabel);
  {
    switch (variation) {
      case "outline":
        svgpath = svgoutline;
        viewBox = "0 0 24 24";
        break;
      case "solid":
        svgpath = svgsolid;
        viewBox = "0 0 24 24";
        break;
      default:
        svgpath = svgoutline;
        viewBox = "0 0 24 24";
    }
  }
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { role: "button" },
      { tabindex: "0" },
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      {
        class: escape_attribute_value($$props.class)
      },
      escape_object($$restProps),
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      { fill: "none" },
      { viewBox: escape_attribute_value(viewBox) },
      { "stroke-width": "2" }
    ],
    {}
  )}><!-- HTML_TAG_START -->${svgpath}<!-- HTML_TAG_END --></svg> `;
});
let btnClass = "ms-3 md:hidden";
const NavHamburger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["menuClass", "onClick"]);
  let { menuClass = "h-6 w-6 shrink-0" } = $$props;
  let { onClick = void 0 } = $$props;
  getContext("navHidden") ?? writable(true);
  if ($$props.menuClass === void 0 && $$bindings.menuClass && menuClass !== void 0) $$bindings.menuClass(menuClass);
  if ($$props.onClick === void 0 && $$bindings.onClick && onClick !== void 0) $$bindings.onClick(onClick);
  return `${validate_component(ToolbarButton, "ToolbarButton").$$render($$result, Object.assign({}, { name: "Open main menu" }, $$restProps, { class: twMerge(btnClass, $$props.class) }), {}, {
    default: () => {
      return `${validate_component(Menu, "Menu").$$render(
        $$result,
        {
          class: twMerge(menuClass, $$props.classMenu)
        },
        {},
        {}
      )}`;
    }
  })} `;
});
const NavLi = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let active;
  let liClass;
  let $$restProps = compute_rest_props($$props, ["href", "activeClass", "nonActiveClass"]);
  let { href = "" } = $$props;
  let { activeClass = void 0 } = $$props;
  let { nonActiveClass = void 0 } = $$props;
  const context = getContext("navbarContext") ?? {};
  const activeUrlStore = getContext("activeUrl");
  let navUrl = "";
  activeUrlStore.subscribe((value) => {
    navUrl = value;
  });
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  if ($$props.activeClass === void 0 && $$bindings.activeClass && activeClass !== void 0) $$bindings.activeClass(activeClass);
  if ($$props.nonActiveClass === void 0 && $$bindings.nonActiveClass && nonActiveClass !== void 0) $$bindings.nonActiveClass(nonActiveClass);
  active = navUrl ? href === navUrl : false;
  liClass = twMerge(
    "block py-2 pe-4 ps-3 md:p-0 rounded md:border-0",
    active ? activeClass ?? context.activeClass : nonActiveClass ?? context.nonActiveClass,
    $$props.class
  );
  return `<li>${((tag) => {
    return tag ? `<${href ? "a" : "div"}${spread(
      [
        {
          role: escape_attribute_value(href ? void 0 : "link")
        },
        { href: escape_attribute_value(href) },
        escape_object($$restProps),
        { class: escape_attribute_value(liClass) }
      ],
      {}
    )}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(href ? "a" : "div")}</li> `;
});
const NavUl = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "activeUrl",
    "divClass",
    "ulClass",
    "hidden",
    "slideParams",
    "activeClass",
    "nonActiveClass"
  ]);
  let $hiddenStore, $$unsubscribe_hiddenStore;
  const activeUrlStore = writable("");
  let { activeUrl = "" } = $$props;
  let { divClass = "w-full md:block md:w-auto" } = $$props;
  let { ulClass = "flex flex-col p-4 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:text-sm md:font-medium" } = $$props;
  let { hidden = void 0 } = $$props;
  let { slideParams = {
    delay: 250,
    duration: 500,
    easing: quintOut
  } } = $$props;
  let { activeClass = "text-white bg-primary-700 md:bg-transparent md:text-primary-700 md:dark:text-white dark:bg-primary-600 md:dark:bg-transparent" } = $$props;
  let { nonActiveClass = "text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-700 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" } = $$props;
  setContext("navbarContext", { activeClass, nonActiveClass });
  setContext("activeUrl", activeUrlStore);
  let hiddenStore = getContext("navHidden");
  $$unsubscribe_hiddenStore = subscribe(hiddenStore, (value) => $hiddenStore = value);
  let _hidden;
  let _divClass;
  let _ulClass;
  if ($$props.activeUrl === void 0 && $$bindings.activeUrl && activeUrl !== void 0) $$bindings.activeUrl(activeUrl);
  if ($$props.divClass === void 0 && $$bindings.divClass && divClass !== void 0) $$bindings.divClass(divClass);
  if ($$props.ulClass === void 0 && $$bindings.ulClass && ulClass !== void 0) $$bindings.ulClass(ulClass);
  if ($$props.hidden === void 0 && $$bindings.hidden && hidden !== void 0) $$bindings.hidden(hidden);
  if ($$props.slideParams === void 0 && $$bindings.slideParams && slideParams !== void 0) $$bindings.slideParams(slideParams);
  if ($$props.activeClass === void 0 && $$bindings.activeClass && activeClass !== void 0) $$bindings.activeClass(activeClass);
  if ($$props.nonActiveClass === void 0 && $$bindings.nonActiveClass && nonActiveClass !== void 0) $$bindings.nonActiveClass(nonActiveClass);
  {
    {
      activeUrlStore.set(activeUrl);
    }
  }
  _hidden = hidden ?? $hiddenStore ?? true;
  _divClass = twMerge(divClass, $$props.class);
  _ulClass = twMerge(
    ulClass,
    // 'divide-y md:divide-y-0 divide-gray-100 dark:divide-gray-700',
    $$props.classUl
  );
  $$unsubscribe_hiddenStore();
  return `${!_hidden ? `<div${spread(
    [
      escape_object($$restProps),
      { class: escape_attribute_value(_divClass) },
      { role: "button" },
      { tabindex: "0" }
    ],
    {}
  )}>${validate_component(Frame, "Frame").$$render(
    $$result,
    {
      tag: "ul",
      border: true,
      rounded: true,
      color: "navbarUl",
      class: _ulClass
    },
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}</div>` : `<div${spread(
    [
      escape_object($$restProps),
      { class: escape_attribute_value(_divClass) },
      { hidden: _hidden || null }
    ],
    {}
  )}><ul${add_attribute("class", _ulClass, 0)}>${slots.default ? slots.default({}) : ``}</ul></div>`} `;
});
const Navbar_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_project;
  let $$unsubscribe_simulationName;
  $$unsubscribe_project = subscribe(project, (value) => value);
  $$unsubscribe_simulationName = subscribe(simulationName, (value) => value);
  let { fluid = true } = $$props;
  if ($$props.fluid === void 0 && $$bindings.fluid && fluid !== void 0) $$bindings.fluid(fluid);
  $$unsubscribe_project();
  $$unsubscribe_simulationName();
  return `${validate_component(Navbar, "Navbar").$$render($$result, { fluid, color: "default" }, {}, {
    default: () => {
      return ` ${validate_component(NavBrand, "NavBrand").$$render($$result, { href: "/", class: "ms-2 md:me-24" }, {}, {
        default: () => {
          return `<img src="/images/temp_logo.png" class="me-1 h-8 sm:h-12" alt="Temp Logo"> <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white sm:text-2xl" data-svelte-h="svelte-1o2n7h2">Crowd</span>`;
        }
      })}  ${validate_component(NavHamburger, "NavHamburger").$$render($$result, {}, {}, {})} ${validate_component(NavUl, "NavUl").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(NavLi, "NavLi").$$render($$result, { href: "/" }, {}, {
            default: () => {
              return `${validate_component(ToolbarButton, "ToolbarButton").$$render($$result, { class: "text-gray-500  md:text-lg" }, {}, {
                default: () => {
                  return `Home`;
                }
              })}`;
            }
          })} ${validate_component(NavLi, "NavLi").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(ToolbarButton, "ToolbarButton").$$render($$result, { class: "text-gray-500 md:text-lg" }, {}, {
                default: () => {
                  return `Project`;
                }
              })}`;
            }
          })} ${validate_component(NavLi, "NavLi").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(ToolbarButton, "ToolbarButton").$$render($$result, { class: "text-gray-500 md:text-lg" }, {}, {
                default: () => {
                  return `Network`;
                }
              })}`;
            }
          })} ${validate_component(NavLi, "NavLi").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(ToolbarButton, "ToolbarButton").$$render($$result, { class: "text-gray-500 md:text-lg" }, {}, {
                default: () => {
                  return `Results`;
                }
              })}`;
            }
          })} ${validate_component(NavLi, "NavLi").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(ToolbarButton, "ToolbarButton").$$render($$result, { class: "text-gray-500 md:text-lg" }, {}, {
                default: () => {
                  return `Method Lab`;
                }
              })}`;
            }
          })} ${validate_component(NavLi, "NavLi").$$render($$result, { href: "/settings" }, {}, {
            default: () => {
              return `${validate_component(ToolbarButton, "ToolbarButton").$$render($$result, { class: "text-gray-500 md:text-lg" }, {}, {
                default: () => {
                  return `Settings`;
                }
              })}`;
            }
          })} ${validate_component(NavLi, "NavLi").$$render($$result, { href: "/help" }, {}, {
            default: () => {
              return `${validate_component(ToolbarButton, "ToolbarButton").$$render($$result, { class: "text-gray-500 md:text-lg" }, {}, {
                default: () => {
                  return `Help`;
                }
              })}`;
            }
          })} `;
        }
      })} `;
    }
  })}`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const ssr = false;
  if ($$props.ssr === void 0 && $$bindings.ssr && ssr !== void 0) $$bindings.ssr(ssr);
  return `<header class="sticky top-0 z-40 mx-auto w-full flex-none border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-800">${validate_component(Navbar_1, "Navbar").$$render($$result, {}, {}, {})}</header> <div class="overflow-hidden lg:flex"> <div class="h-full w-full overflow-y-auto">${slots.default ? slots.default({}) : ``}</div></div> `;
});
export {
  Layout as default
};
