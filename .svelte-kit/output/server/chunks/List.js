import { c as create_ssr_component, b as compute_rest_props, e as spread, g as escape_object, f as escape_attribute_value } from "./ssr.js";
import { twMerge } from "tailwind-merge";
import { i as is_void } from "./names.js";
const Li = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["icon", "liClass"]);
  let { icon = false } = $$props;
  let { liClass = "" } = $$props;
  let classLi = twMerge(liClass, icon && "flex items-center", $$props.class);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0) $$bindings.icon(icon);
  if ($$props.liClass === void 0 && $$bindings.liClass && liClass !== void 0) $$bindings.liClass(liClass);
  return `<li${spread([escape_object($$restProps), { class: escape_attribute_value(classLi) }], {})}>${slots.default ? slots.default({}) : ``}</li> `;
});
const List = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["tag", "list", "position"]);
  let { tag = "ul" } = $$props;
  let { list = void 0 } = $$props;
  let { position = "inside" } = $$props;
  let lists = {
    disc: "list-disc",
    none: "list-none",
    decimal: "list-decimal"
  };
  let positions = {
    inside: "list-inside",
    outside: "list-outside"
  };
  let classList = twMerge(lists[list ?? (tag === "ul" ? "disc" : "decimal")], positions[position], $$props.class);
  if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0) $$bindings.tag(tag);
  if ($$props.list === void 0 && $$bindings.list && list !== void 0) $$bindings.list(list);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0) $$bindings.position(position);
  return `${((tag$1) => {
    return tag$1 ? `<${tag}${spread([escape_object($$restProps), { class: escape_attribute_value(classList) }], {})}>${is_void(tag$1) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
  })(tag)} `;
});
export {
  List as L,
  Li as a
};
