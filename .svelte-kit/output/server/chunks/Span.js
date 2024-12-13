import { c as create_ssr_component, b as compute_rest_props, e as spread, g as escape_object, f as escape_attribute_value } from "./ssr.js";
import { twMerge } from "tailwind-merge";
const Span = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "italic",
    "underline",
    "linethrough",
    "uppercase",
    "gradient",
    "highlight",
    "highlightClass",
    "decorationClass",
    "gradientClass"
  ]);
  let { italic = false } = $$props;
  let { underline = false } = $$props;
  let { linethrough = false } = $$props;
  let { uppercase = false } = $$props;
  let { gradient = false } = $$props;
  let { highlight = false } = $$props;
  let { highlightClass = "text-blue-600 dark:text-blue-500" } = $$props;
  let { decorationClass = "decoration-2 decoration-blue-400 dark:decoration-blue-600" } = $$props;
  let { gradientClass = "text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400" } = $$props;
  let underlineClass = twMerge("underline", decorationClass);
  let classSpan = twMerge(
    italic && "italic",
    underline && underlineClass,
    linethrough && "line-through",
    uppercase && "uppercase",
    gradient ? gradientClass : "font-semibold text-gray-900 dark:text-white",
    highlight && highlightClass,
    $$props.class
  );
  if ($$props.italic === void 0 && $$bindings.italic && italic !== void 0) $$bindings.italic(italic);
  if ($$props.underline === void 0 && $$bindings.underline && underline !== void 0) $$bindings.underline(underline);
  if ($$props.linethrough === void 0 && $$bindings.linethrough && linethrough !== void 0) $$bindings.linethrough(linethrough);
  if ($$props.uppercase === void 0 && $$bindings.uppercase && uppercase !== void 0) $$bindings.uppercase(uppercase);
  if ($$props.gradient === void 0 && $$bindings.gradient && gradient !== void 0) $$bindings.gradient(gradient);
  if ($$props.highlight === void 0 && $$bindings.highlight && highlight !== void 0) $$bindings.highlight(highlight);
  if ($$props.highlightClass === void 0 && $$bindings.highlightClass && highlightClass !== void 0) $$bindings.highlightClass(highlightClass);
  if ($$props.decorationClass === void 0 && $$bindings.decorationClass && decorationClass !== void 0) $$bindings.decorationClass(decorationClass);
  if ($$props.gradientClass === void 0 && $$bindings.gradientClass && gradientClass !== void 0) $$bindings.gradientClass(gradientClass);
  return `<span${spread([escape_object($$restProps), { class: escape_attribute_value(classSpan) }], {})}>${slots.default ? slots.default({}) : ``}</span> `;
});
export {
  Span as S
};
