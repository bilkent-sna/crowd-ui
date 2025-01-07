import { c as create_ssr_component, b as compute_rest_props, h as getContext, v as validate_component, e as spread, f as escape_attribute_value, g as escape_object, a as add_attribute, k as compute_slots, i as escape, l as createEventDispatcher, s as setContext, j as each, o as onDestroy, d as subscribe } from "../../../chunks/ssr.js";
import { H as Heading } from "../../../chunks/Heading.js";
import { P } from "../../../chunks/P.js";
import { M as Modal, E as ExclamationCircleOutline, S as Span } from "../../../chunks/ExclamationCircleOutline.js";
import { p as project, b as simulationType, n as nodeOrEdge } from "../../../chunks/projects.js";
import { B as Button } from "../../../chunks/Button.js";
import { l as labelClass, i as inputClass } from "../../../chunks/Radio.js";
import { L as Label } from "../../../chunks/Label.js";
import { twMerge } from "tailwind-merge";
import { F as Frame } from "../../../chunks/Frame.js";
import "file-saver";
import { basicSetup } from "codemirror";
import { EditorView, keymap, placeholder } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { indentWithTab } from "@codemirror/commands";
import { indentUnit } from "@codemirror/language";
import { python } from "@codemirror/lang-python";
import "@tauri-apps/api/tauri";
import { L as List, a as Li } from "../../../chunks/List.js";
const Checkbox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["color", "custom", "inline", "group", "value", "checked", "spacing"]);
  let $$slots = compute_slots(slots);
  let { color = "primary" } = $$props;
  let { custom = false } = $$props;
  let { inline = false } = $$props;
  let { group = [] } = $$props;
  let { value = "on" } = $$props;
  let { checked = void 0 } = $$props;
  let { spacing = "me-2" } = $$props;
  let background = getContext("background");
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.custom === void 0 && $$bindings.custom && custom !== void 0) $$bindings.custom(custom);
  if ($$props.inline === void 0 && $$bindings.inline && inline !== void 0) $$bindings.inline(inline);
  if ($$props.group === void 0 && $$bindings.group && group !== void 0) $$bindings.group(group);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0) $$bindings.checked(checked);
  if ($$props.spacing === void 0 && $$bindings.spacing && spacing !== void 0) $$bindings.spacing(spacing);
  return `${validate_component(Label, "Label").$$render(
    $$result,
    {
      class: labelClass(inline, $$props.class),
      show: $$slots.default
    },
    {},
    {
      default: () => {
        return `<input${spread(
          [
            { type: "checkbox" },
            { value: escape_attribute_value(value) },
            escape_object($$restProps),
            {
              class: escape_attribute_value(inputClass(custom, color, true, background, spacing, $$slots.default || $$props.class))
            }
          ],
          {}
        )}${add_attribute("checked", checked, 1)}> ${slots.default ? slots.default({}) : ``}`;
      }
    }
  )} `;
});
const ListgroupItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { active = getContext("active") } = $$props;
  let { current = false } = $$props;
  let { disabled = false } = $$props;
  let { href = "" } = $$props;
  let { currentClass = "text-white bg-primary-700 dark:text-white dark:bg-gray-800" } = $$props;
  let { normalClass = "" } = $$props;
  let { disabledClass = "text-gray-900 bg-gray-100 dark:bg-gray-600 dark:text-gray-400" } = $$props;
  let { focusClass = "focus:z-40 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:text-primary-700 dark:focus:ring-gray-500 dark:focus:text-white" } = $$props;
  let { hoverClass = "hover:bg-gray-100 hover:text-primary-700 dark:hover:bg-gray-600 dark:hover:text-white" } = $$props;
  let { itemDefaultClass = "py-2 px-4 w-full text-sm font-medium list-none first:rounded-t-lg last:rounded-b-lg" } = $$props;
  let { attrs = void 0 } = $$props;
  const states = {
    current: currentClass,
    normal: normalClass,
    disabled: disabledClass
  };
  let state;
  let itemClass;
  if ($$props.active === void 0 && $$bindings.active && active !== void 0) $$bindings.active(active);
  if ($$props.current === void 0 && $$bindings.current && current !== void 0) $$bindings.current(current);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  if ($$props.currentClass === void 0 && $$bindings.currentClass && currentClass !== void 0) $$bindings.currentClass(currentClass);
  if ($$props.normalClass === void 0 && $$bindings.normalClass && normalClass !== void 0) $$bindings.normalClass(normalClass);
  if ($$props.disabledClass === void 0 && $$bindings.disabledClass && disabledClass !== void 0) $$bindings.disabledClass(disabledClass);
  if ($$props.focusClass === void 0 && $$bindings.focusClass && focusClass !== void 0) $$bindings.focusClass(focusClass);
  if ($$props.hoverClass === void 0 && $$bindings.hoverClass && hoverClass !== void 0) $$bindings.hoverClass(hoverClass);
  if ($$props.itemDefaultClass === void 0 && $$bindings.itemDefaultClass && itemDefaultClass !== void 0) $$bindings.itemDefaultClass(itemDefaultClass);
  if ($$props.attrs === void 0 && $$bindings.attrs && attrs !== void 0) $$bindings.attrs(attrs);
  state = disabled ? "disabled" : current ? "current" : "normal";
  itemClass = twMerge(itemDefaultClass, states[state], active && state === "disabled" && "cursor-not-allowed", active && state === "normal" && hoverClass, active && state === "normal" && focusClass, $$props.class);
  return `${!active ? `<li${add_attribute("class", itemClass, 0)}>${slots.default ? slots.default({ item: $$props }) : ``}</li>` : `${href ? `<a${spread(
    [
      escape_object(attrs),
      { href: escape_attribute_value(href) },
      {
        class: "block " + escape(itemClass, true)
      },
      {
        "aria-current": escape_attribute_value(current)
      }
    ],
    {}
  )}>${slots.default ? slots.default({ item: $$props }) : ``}</a>` : `<button${spread(
    [
      { type: "button" },
      escape_object(attrs),
      {
        class: "flex items-center text-left " + escape(itemClass, true)
      },
      { disabled: disabled || null },
      {
        "aria-current": escape_attribute_value(current)
      }
    ],
    {}
  )}>${slots.default ? slots.default({ item: $$props }) : ``}</button>`}`} `;
});
const Listgroup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["items", "active", "defaultClass"]);
  createEventDispatcher();
  let { items = [] } = $$props;
  let { active = false } = $$props;
  let { defaultClass = "divide-y divide-gray-200 dark:divide-gray-600" } = $$props;
  let groupClass;
  if ($$props.items === void 0 && $$bindings.items && items !== void 0) $$bindings.items(items);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0) $$bindings.active(active);
  if ($$props.defaultClass === void 0 && $$bindings.defaultClass && defaultClass !== void 0) $$bindings.defaultClass(defaultClass);
  {
    setContext("active", active);
  }
  groupClass = twMerge(defaultClass, $$props.class);
  return `${validate_component(Frame, "Frame").$$render($$result, Object.assign({}, { tag: active ? "div" : "ul" }, $$restProps, { rounded: true }, { border: true }, { class: groupClass }), {}, {
    default: () => {
      return `${items.length ? each(items, (item, index) => {
        return `${typeof item === "string" ? `${validate_component(ListgroupItem, "ListgroupItem").$$render($$result, { active, index }, {}, {
          default: () => {
            return `${slots.default ? slots.default({ item, index }) : ``}`;
          }
        })}` : `${validate_component(ListgroupItem, "ListgroupItem").$$render($$result, Object.assign({}, { active }, item, { index }), {}, {
          default: () => {
            return `${slots.default ? slots.default({ item, index }) : ``}`;
          }
        })}`}`;
      }) : (() => {
        let item = items[0];
        return ` ${slots.default ? slots.default({ item, index: 0 }) : ``}`;
      })()}`;
    }
  })} `;
});
const css$3 = {
  code: ".codemirror-wrapper.svelte-nofj9o .cm-focused{outline:none}.scm-waiting.svelte-nofj9o{position:relative}.scm-waiting__loading.svelte-nofj9o{position:absolute;top:0;left:0;bottom:0;right:0;background-color:rgba(255, 255, 255, 0.5)}.scm-loading.svelte-nofj9o{display:flex;align-items:center;justify-content:center}.scm-loading__spinner.svelte-nofj9o{width:1rem;height:1rem;border-radius:100%;border:solid 2px #000;border-top-color:transparent;margin-right:0.75rem;animation:svelte-nofj9o-spin 1s linear infinite}.scm-loading__text.svelte-nofj9o{font-family:sans-serif}.scm-pre.svelte-nofj9o{font-size:0.85rem;font-family:monospace;-o-tab-size:2;tab-size:2;-moz-tab-size:2;resize:none;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;user-select:none;overflow:auto}@keyframes svelte-nofj9o-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}",
  map: '{"version":3,"file":"CodeMirror.svelte","sources":["CodeMirror.svelte"],"sourcesContent":["<script context=\\"module\\"><\/script>\\n\\n<script>import { createEventDispatcher, onDestroy, onMount } from \\"svelte\\";\\nimport { basicSetup } from \\"codemirror\\";\\nimport { EditorView, keymap, placeholder as placeholderExt } from \\"@codemirror/view\\";\\nimport { EditorState, StateEffect } from \\"@codemirror/state\\";\\nimport { indentWithTab } from \\"@codemirror/commands\\";\\nimport { indentUnit } from \\"@codemirror/language\\";\\nimport { debounce } from \\"./util\\";\\nlet classes = \\"\\";\\nexport { classes as class };\\nexport let value = \\"\\";\\nexport let basic = true;\\nexport let lang = void 0;\\nexport let theme = void 0;\\nexport let extensions = [];\\nexport let useTab = true;\\nexport let tabSize = 2;\\nexport let styles = void 0;\\nexport let lineWrapping = false;\\nexport let editable = true;\\nexport let readonly = false;\\nexport let placeholder = void 0;\\nexport let nodebounce = false;\\nconst is_browser = typeof window !== \\"undefined\\";\\nconst dispatch = createEventDispatcher();\\nlet element;\\nlet view;\\nlet update_from_prop = false;\\nlet update_from_state = false;\\nlet first_config = true;\\nlet first_update = true;\\n$: state_extensions = [\\n  ...get_base_extensions(basic, useTab, tabSize, lineWrapping, placeholder, editable, readonly, lang),\\n  ...get_theme(theme, styles),\\n  ...extensions\\n];\\n$: view && update(value);\\n$: view && state_extensions && reconfigure();\\n$: on_change = nodebounce ? handle_change : debounce(handle_change, 300);\\nonMount(() => {\\n  view = create_editor_view();\\n  dispatch(\\"ready\\", view);\\n});\\nonDestroy(() => view?.destroy());\\nfunction create_editor_view() {\\n  return new EditorView({\\n    parent: element,\\n    state: create_editor_state(value),\\n    dispatch(transaction) {\\n      view.update([transaction]);\\n      if (!update_from_prop && transaction.docChanged) {\\n        on_change();\\n      }\\n    }\\n  });\\n}\\nfunction reconfigure() {\\n  if (first_config) {\\n    first_config = false;\\n    return;\\n  }\\n  view.dispatch({\\n    effects: StateEffect.reconfigure.of(state_extensions)\\n  });\\n  dispatch(\\"reconfigure\\", view);\\n}\\nfunction update(value2) {\\n  if (first_update) {\\n    first_update = false;\\n    return;\\n  }\\n  if (update_from_state) {\\n    update_from_state = false;\\n    return;\\n  }\\n  update_from_prop = true;\\n  view.setState(create_editor_state(value2));\\n  update_from_prop = false;\\n}\\nfunction handle_change() {\\n  const new_value = view.state.doc.toString();\\n  if (new_value === value) return;\\n  update_from_state = true;\\n  value = new_value;\\n  dispatch(\\"change\\", value);\\n}\\nfunction create_editor_state(value2) {\\n  return EditorState.create({\\n    doc: value2 ?? void 0,\\n    extensions: state_extensions\\n  });\\n}\\nfunction get_base_extensions(basic2, useTab2, tabSize2, lineWrapping2, placeholder2, editable2, readonly2, lang2) {\\n  const extensions2 = [\\n    indentUnit.of(\\" \\".repeat(tabSize2)),\\n    EditorView.editable.of(editable2),\\n    EditorState.readOnly.of(readonly2)\\n  ];\\n  if (basic2) extensions2.push(basicSetup);\\n  if (useTab2) extensions2.push(keymap.of([indentWithTab]));\\n  if (placeholder2) extensions2.push(placeholderExt(placeholder2));\\n  if (lang2) extensions2.push(lang2);\\n  if (lineWrapping2) extensions2.push(EditorView.lineWrapping);\\n  return extensions2;\\n}\\nfunction get_theme(theme2, styles2) {\\n  const extensions2 = [];\\n  if (styles2) extensions2.push(EditorView.theme(styles2));\\n  if (theme2) extensions2.push(theme2);\\n  return extensions2;\\n}\\n<\/script>\\n\\n{#if is_browser}\\n    <div class=\\"codemirror-wrapper {classes}\\" bind:this={element} />\\n{:else}\\n    <div class=\\"scm-waiting {classes}\\">\\n        <div class=\\"scm-waiting__loading scm-loading\\">\\n            <div class=\\"scm-loading__spinner\\" />\\n            <p class=\\"scm-loading__text\\">Loading editor...</p>\\n        </div>\\n\\n        <pre class=\\"scm-pre cm-editor\\">{value}</pre>\\n    </div>\\n{/if}\\n\\n<style>\\n    .codemirror-wrapper :global(.cm-focused) {\\n        outline: none;\\n    }\\n\\n    .scm-waiting {\\n        position: relative;\\n    }\\n    .scm-waiting__loading {\\n        position: absolute;\\n        top: 0;\\n        left: 0;\\n        bottom: 0;\\n        right: 0;\\n        background-color: rgba(255, 255, 255, 0.5);\\n    }\\n\\n    .scm-loading {\\n        display: flex;\\n        align-items: center;\\n        justify-content: center;\\n    }\\n    .scm-loading__spinner {\\n        width: 1rem;\\n        height: 1rem;\\n        border-radius: 100%;\\n        border: solid 2px #000;\\n        border-top-color: transparent;\\n        margin-right: 0.75rem;\\n        animation: spin 1s linear infinite;\\n    }\\n    .scm-loading__text {\\n        font-family: sans-serif;\\n    }\\n    .scm-pre {\\n        font-size: 0.85rem;\\n        font-family: monospace;\\n        -o-tab-size: 2;\\n           tab-size: 2;\\n        -moz-tab-size: 2;\\n        resize: none;\\n        pointer-events: none;\\n        -webkit-user-select: none;\\n           -moz-user-select: none;\\n                user-select: none;\\n        overflow: auto;\\n    }\\n\\n    @keyframes spin {\\n        0% {\\n            transform: rotate(0deg);\\n        }\\n        100% {\\n            transform: rotate(360deg);\\n        }\\n    }\\n</style>\\n"],"names":[],"mappings":"AAgII,iCAAmB,CAAS,WAAa,CACrC,OAAO,CAAE,IACb,CAEA,0BAAa,CACT,QAAQ,CAAE,QACd,CACA,mCAAsB,CAClB,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,MAAM,CAAE,CAAC,CACT,KAAK,CAAE,CAAC,CACR,gBAAgB,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAC7C,CAEA,0BAAa,CACT,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MACrB,CACA,mCAAsB,CAClB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,IAAI,CACnB,MAAM,CAAE,KAAK,CAAC,GAAG,CAAC,IAAI,CACtB,gBAAgB,CAAE,WAAW,CAC7B,YAAY,CAAE,OAAO,CACrB,SAAS,CAAE,kBAAI,CAAC,EAAE,CAAC,MAAM,CAAC,QAC9B,CACA,gCAAmB,CACf,WAAW,CAAE,UACjB,CACA,sBAAS,CACL,SAAS,CAAE,OAAO,CAClB,WAAW,CAAE,SAAS,CACtB,WAAW,CAAE,CAAC,CACX,QAAQ,CAAE,CAAC,CACd,aAAa,CAAE,CAAC,CAChB,MAAM,CAAE,IAAI,CACZ,cAAc,CAAE,IAAI,CACpB,mBAAmB,CAAE,IAAI,CACtB,gBAAgB,CAAE,IAAI,CACjB,WAAW,CAAE,IAAI,CACzB,QAAQ,CAAE,IACd,CAEA,WAAW,kBAAK,CACZ,EAAG,CACC,SAAS,CAAE,OAAO,IAAI,CAC1B,CACA,IAAK,CACD,SAAS,CAAE,OAAO,MAAM,CAC5B,CACJ"}'
};
const CodeMirror = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { class: classes = "" } = $$props;
  let { value = "" } = $$props;
  let { basic = true } = $$props;
  let { lang = void 0 } = $$props;
  let { theme = void 0 } = $$props;
  let { extensions = [] } = $$props;
  let { useTab = true } = $$props;
  let { tabSize = 2 } = $$props;
  let { styles = void 0 } = $$props;
  let { lineWrapping = false } = $$props;
  let { editable = true } = $$props;
  let { readonly = false } = $$props;
  let { placeholder: placeholder$1 = void 0 } = $$props;
  let { nodebounce = false } = $$props;
  const is_browser = typeof window !== "undefined";
  createEventDispatcher();
  let element;
  let view;
  onDestroy(() => view?.destroy());
  function get_base_extensions(basic2, useTab2, tabSize2, lineWrapping2, placeholder2, editable2, readonly2, lang2) {
    const extensions2 = [
      indentUnit.of(" ".repeat(tabSize2)),
      EditorView.editable.of(editable2),
      EditorState.readOnly.of(readonly2)
    ];
    if (basic2) extensions2.push(basicSetup);
    if (useTab2) extensions2.push(keymap.of([indentWithTab]));
    if (placeholder2) extensions2.push(placeholder(placeholder2));
    if (lang2) extensions2.push(lang2);
    if (lineWrapping2) extensions2.push(EditorView.lineWrapping);
    return extensions2;
  }
  function get_theme(theme2, styles2) {
    const extensions2 = [];
    if (styles2) extensions2.push(EditorView.theme(styles2));
    if (theme2) extensions2.push(theme2);
    return extensions2;
  }
  if ($$props.class === void 0 && $$bindings.class && classes !== void 0) $$bindings.class(classes);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.basic === void 0 && $$bindings.basic && basic !== void 0) $$bindings.basic(basic);
  if ($$props.lang === void 0 && $$bindings.lang && lang !== void 0) $$bindings.lang(lang);
  if ($$props.theme === void 0 && $$bindings.theme && theme !== void 0) $$bindings.theme(theme);
  if ($$props.extensions === void 0 && $$bindings.extensions && extensions !== void 0) $$bindings.extensions(extensions);
  if ($$props.useTab === void 0 && $$bindings.useTab && useTab !== void 0) $$bindings.useTab(useTab);
  if ($$props.tabSize === void 0 && $$bindings.tabSize && tabSize !== void 0) $$bindings.tabSize(tabSize);
  if ($$props.styles === void 0 && $$bindings.styles && styles !== void 0) $$bindings.styles(styles);
  if ($$props.lineWrapping === void 0 && $$bindings.lineWrapping && lineWrapping !== void 0) $$bindings.lineWrapping(lineWrapping);
  if ($$props.editable === void 0 && $$bindings.editable && editable !== void 0) $$bindings.editable(editable);
  if ($$props.readonly === void 0 && $$bindings.readonly && readonly !== void 0) $$bindings.readonly(readonly);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder$1 !== void 0) $$bindings.placeholder(placeholder$1);
  if ($$props.nodebounce === void 0 && $$bindings.nodebounce && nodebounce !== void 0) $$bindings.nodebounce(nodebounce);
  $$result.css.add(css$3);
  [
    ...get_base_extensions(basic, useTab, tabSize, lineWrapping, placeholder$1, editable, readonly, lang),
    ...get_theme(theme, styles),
    ...extensions
  ];
  return `${is_browser ? `<div class="${"codemirror-wrapper " + escape(classes, true) + " svelte-nofj9o"}"${add_attribute("this", element, 0)}></div>` : `<div class="${"scm-waiting " + escape(classes, true) + " svelte-nofj9o"}"><div class="scm-waiting__loading scm-loading svelte-nofj9o" data-svelte-h="svelte-1pxusly"><div class="scm-loading__spinner svelte-nofj9o"></div> <p class="scm-loading__text svelte-nofj9o">Loading editor...</p></div> <pre class="scm-pre cm-editor svelte-nofj9o">${escape(value)}</pre></div>`}`;
});
const css$2 = {
  code: ".code-editor.svelte-bhz2uh{width:100%;height:300px;font-family:monospace;margin-bottom:20px}",
  map: `{"version":3,"file":"DiffusionMethodLab.svelte","sources":["DiffusionMethodLab.svelte"],"sourcesContent":["<script>\\r\\n\\t// @ts-nocheck\\r\\n\\r\\n\\timport { Button, Checkbox, Listgroup, ListgroupItem, Heading, P, Modal } from 'flowbite-svelte';\\r\\n\\timport { ExclamationCircleOutline } from 'flowbite-svelte-icons';\\r\\n\\timport fileSaver from 'file-saver';\\r\\n\\timport CodeMirrorEditor from 'svelte-codemirror-editor';\\r\\n\\timport { python } from '@codemirror/lang-python';\\r\\n\\timport { onMount } from 'svelte';\\r\\n\\timport { invoke } from '@tauri-apps/api/tauri';\\r\\n\\timport { project } from '$lib/stores/projects';\\r\\n\\r\\n\\tlet code = '';\\r\\n\\tlet functions = [];\\r\\n\\tlet functionSettings = {};\\r\\n\\r\\n\\tlet errorModalOpen = false;\\r\\n\\tlet latestError = 'error';\\r\\n\\r\\n\\tonMount(async () => {\\r\\n\\t\\tawait loadMethodsFile();\\r\\n\\t});\\r\\n\\r\\n\\tasync function loadMethodsFile() {\\r\\n\\t\\ttry {\\r\\n\\t\\t\\tconst result = await invoke('run_python_load_methods', {\\r\\n\\t\\t\\t\\tproject_name: $project.name\\r\\n\\t\\t\\t});\\r\\n\\t\\t\\tcode = JSON.parse(result).content;\\r\\n\\t\\t\\tconsole.log(code);\\r\\n\\t\\t} catch (error) {\\r\\n\\t\\t\\tconsole.error('Error getting methods from Python:', error);\\r\\n\\t\\t\\tlatestError = error;\\r\\n\\t\\t\\terrorModalOpen = true;\\r\\n\\t\\t}\\r\\n\\t}\\r\\n\\r\\n\\tasync function saveMethodsFile() {\\r\\n\\t\\ttry {\\r\\n\\t\\t\\tawait invoke('run_python_save_methods', {\\r\\n\\t\\t\\t\\tproject_name: $project.name,\\r\\n\\t\\t\\t\\tcode: code\\r\\n\\t\\t\\t});\\r\\n\\t\\t} catch (error) {\\r\\n\\t\\t\\tconsole.error('Error saving methods with Python', error);\\r\\n\\t\\t\\tlatestError = error;\\r\\n\\t\\t\\terrorModalOpen = true;\\r\\n\\t\\t}\\r\\n\\t}\\r\\n\\r\\n\\tasync function saveListView() {\\r\\n\\t\\ttry {\\r\\n\\t\\t\\tawait invoke('run_python_save_methods_list_view', {\\r\\n\\t\\t\\t\\tproject_name: $project.name,\\r\\n\\t\\t\\t\\tlist_view: JSON.stringify(functionSettings)\\r\\n\\t\\t\\t});\\r\\n\\r\\n\\t\\t\\tconsole.log('List view saved successfully');\\r\\n\\t\\t} catch (error) {\\r\\n\\t\\t\\tconsole.error('Error saving list view with Python', error);\\r\\n\\t\\t\\tlatestError = error;\\r\\n\\t\\t\\terrorModalOpen = true;\\r\\n\\t\\t}\\r\\n\\t}\\r\\n\\r\\n\\tfunction extractFunctionNames(code) {\\r\\n\\t\\tconst regex = /def\\\\s+(\\\\w+)\\\\s*\\\\(/g;\\r\\n\\t\\tlet match;\\r\\n\\t\\tconst result = [];\\r\\n\\t\\twhile ((match = regex.exec(code)) !== null) {\\r\\n\\t\\t\\tresult.push(match[1]);\\r\\n\\t\\t}\\r\\n\\t\\treturn result;\\r\\n\\t}\\r\\n\\r\\n\\tfunction handleCodeChange(value) {\\r\\n\\t\\tcode = value;\\r\\n\\t\\tfunctions = extractFunctionNames(code);\\r\\n\\t\\tfunctions.forEach((func) => {\\r\\n\\t\\t\\tif (!functionSettings[func]) {\\r\\n\\t\\t\\t\\tfunctionSettings[func] = {\\r\\n\\t\\t\\t\\t\\tbefore_iteration: false,\\r\\n\\t\\t\\t\\t\\tafter_iteration: false,\\r\\n\\t\\t\\t\\t\\tafter_simulation: false\\r\\n\\t\\t\\t\\t};\\r\\n\\t\\t\\t}\\r\\n\\t\\t});\\r\\n\\t}\\r\\n\\r\\n\\tfunction handleCheckboxChange(func, key, value) {\\r\\n\\t\\tfunctionSettings[func][key] = value;\\r\\n\\t}\\r\\n\\r\\n\\tfunction saveMethods() {\\r\\n\\t\\thandleCodeChange(code);\\r\\n\\t\\tconsole.log('Methods saved', code, functionSettings);\\r\\n\\t\\tsaveMethodsFile();\\r\\n\\t}\\r\\n\\r\\n\\tfunction downloadMethods() {\\r\\n\\t\\tconst blob = new Blob([code], { type: 'text/plain;charset=utf-8' });\\r\\n\\t\\tfileSaver(blob, 'methods.py');\\r\\n\\t}\\r\\n<\/script>\\r\\n\\r\\n<div class=\\"container mx-auto p-4\\">\\r\\n\\t<div class=\\"-mx-2 flex flex-wrap\\">\\r\\n\\t\\t<div class=\\"mb-4 w-3/4 px-2\\" style=\\"border-right: 1px solid #cecece;\\">\\r\\n\\t\\t\\t<Heading tag=\\"h2\\" class=\\"mb-2\\">Code View</Heading>\\r\\n\\t\\t\\t<P>\\r\\n\\t\\t\\t\\tHere, we should provide user information about which simulation parameters they can use.\\r\\n\\t\\t\\t</P>\\r\\n\\t\\t\\t<P class=\\"my-2 text-sm text-gray-500\\">\\r\\n\\t\\t\\t\\tNote: Make sure to save both views before leaving the page if you want them to be used in\\r\\n\\t\\t\\t\\tthe next simulation.\\r\\n\\t\\t\\t</P>\\r\\n\\t\\t\\t<Button class=\\"my-2\\" on:click={saveMethods}>Save Methods</Button>\\r\\n\\t\\t\\t<Button class=\\"my-2\\" on:click={downloadMethods}>Download Methods</Button>\\r\\n\\t\\t\\t<div class=\\"code-editor\\">\\r\\n\\t\\t\\t\\t<CodeMirrorEditor bind:value={code} lang={python()} />\\r\\n\\t\\t\\t</div>\\r\\n\\t\\t</div>\\r\\n\\t\\t<div class=\\"mb-4 w-1/4 px-2\\">\\r\\n\\t\\t\\t<Heading tag=\\"h2\\" class=\\"mb-2\\">List View</Heading>\\r\\n\\t\\t\\t<P>\\r\\n\\t\\t\\t\\tChoose when do you want to call each function. If no option is selected, it will not be\\r\\n\\t\\t\\t\\tcalled explicitly. This can be useful in helper methods which you call from other methods.\\r\\n\\t\\t\\t</P>\\r\\n\\r\\n\\t\\t\\t<Listgroup class=\\"my-4\\">\\r\\n\\t\\t\\t\\t{#each functions as func}\\r\\n\\t\\t\\t\\t\\t<ListgroupItem>\\r\\n\\t\\t\\t\\t\\t\\t<P><b>{func}</b></P>\\r\\n\\t\\t\\t\\t\\t\\t<div class=\\"mt-2\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t<Checkbox\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tid=\\"before_iteration_{func}\\"\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tbind:checked={functionSettings[func].before_iteration}\\r\\n\\t\\t\\t\\t\\t\\t\\t>\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tBefore iteration\\r\\n\\t\\t\\t\\t\\t\\t\\t</Checkbox>\\r\\n\\t\\t\\t\\t\\t\\t\\t<Checkbox\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tid=\\"after_iteration_{func}\\"\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tbind:checked={functionSettings[func].after_iteration}\\r\\n\\t\\t\\t\\t\\t\\t\\t>\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tAfter iteration\\r\\n\\t\\t\\t\\t\\t\\t\\t</Checkbox>\\r\\n\\t\\t\\t\\t\\t\\t\\t<Checkbox\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tid=\\"after_simulation_{func}\\"\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tbind:checked={functionSettings[func].after_simulation}\\r\\n\\t\\t\\t\\t\\t\\t\\t>\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tAfter simulation\\r\\n\\t\\t\\t\\t\\t\\t\\t</Checkbox>\\r\\n\\t\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t\\t</ListgroupItem>\\r\\n\\t\\t\\t\\t{/each}\\r\\n\\t\\t\\t</Listgroup>\\r\\n\\t\\t\\t<Button class=\\"my-2\\" on:click={saveListView}>Save Choices</Button>\\r\\n\\t\\t</div>\\r\\n\\t</div>\\r\\n</div>\\r\\n\\r\\n<Modal bind:open={errorModalOpen} size=\\"xs\\" autoclose>\\r\\n\\t<div class=\\"text-center\\">\\r\\n\\t\\t<ExclamationCircleOutline class=\\"mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200\\" />\\r\\n\\t\\t<h3 class=\\"mb-1 text-xl font-normal text-gray-800 dark:text-gray-400\\">Error:</h3>\\r\\n\\t\\t<P class=\\"mb-5 text-center text-lg font-normal text-gray-700 dark:text-gray-400\\"\\r\\n\\t\\t\\t>{latestError}</P\\r\\n\\t\\t>\\r\\n\\t\\t<Button\\r\\n\\t\\t\\tcolor=\\"red\\"\\r\\n\\t\\t\\tclass=\\"me-2\\"\\r\\n\\t\\t\\ton:click={() => {\\r\\n\\t\\t\\t\\terrorModalOpen = false;\\r\\n\\t\\t\\t}}>Try again</Button\\r\\n\\t\\t>\\r\\n\\t</div>\\r\\n</Modal>\\r\\n\\r\\n<style>\\r\\n\\t.code-editor {\\r\\n\\t\\twidth: 100%;\\r\\n\\t\\theight: 300px;\\r\\n\\t\\tfont-family: monospace;\\r\\n\\t\\tmargin-bottom: 20px;\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAmLC,0BAAa,CACZ,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,KAAK,CACb,WAAW,CAAE,SAAS,CACtB,aAAa,CAAE,IAChB"}`
};
const DiffusionMethodLab = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_project;
  $$unsubscribe_project = subscribe(project, (value) => value);
  let code = "";
  let functions = [];
  let functionSettings = {};
  let errorModalOpen = false;
  let latestError = "error";
  $$result.css.add(css$2);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="container mx-auto p-4"><div class="-mx-2 flex flex-wrap"><div class="mb-4 w-3/4 px-2" style="border-right: 1px solid #cecece;">${validate_component(Heading, "Heading").$$render($$result, { tag: "h2", class: "mb-2" }, {}, {
      default: () => {
        return `Code View`;
      }
    })} ${validate_component(P, "P").$$render($$result, {}, {}, {
      default: () => {
        return `Here, we should provide user information about which simulation parameters they can use.`;
      }
    })} ${validate_component(P, "P").$$render($$result, { class: "my-2 text-sm text-gray-500" }, {}, {
      default: () => {
        return `Note: Make sure to save both views before leaving the page if you want them to be used in
				the next simulation.`;
      }
    })} ${validate_component(Button, "Button").$$render($$result, { class: "my-2" }, {}, {
      default: () => {
        return `Save Methods`;
      }
    })} ${validate_component(Button, "Button").$$render($$result, { class: "my-2" }, {}, {
      default: () => {
        return `Download Methods`;
      }
    })} <div class="code-editor svelte-bhz2uh">${validate_component(CodeMirror, "CodeMirrorEditor").$$render(
      $$result,
      { lang: python(), value: code },
      {
        value: ($$value) => {
          code = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div> <div class="mb-4 w-1/4 px-2">${validate_component(Heading, "Heading").$$render($$result, { tag: "h2", class: "mb-2" }, {}, {
      default: () => {
        return `List View`;
      }
    })} ${validate_component(P, "P").$$render($$result, {}, {}, {
      default: () => {
        return `Choose when do you want to call each function. If no option is selected, it will not be
				called explicitly. This can be useful in helper methods which you call from other methods.`;
      }
    })} ${validate_component(Listgroup, "Listgroup").$$render($$result, { class: "my-4" }, {}, {
      default: () => {
        return `${each(functions, (func) => {
          return `${validate_component(ListgroupItem, "ListgroupItem").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(P, "P").$$render($$result, {}, {}, {
                default: () => {
                  return `<b>${escape(func)}</b>`;
                }
              })} <div class="mt-2">${validate_component(Checkbox, "Checkbox").$$render(
                $$result,
                {
                  id: "before_iteration_" + func,
                  checked: functionSettings[func].before_iteration
                },
                {
                  checked: ($$value) => {
                    functionSettings[func].before_iteration = $$value;
                    $$settled = false;
                  }
                },
                {
                  default: () => {
                    return `Before iteration
							`;
                  }
                }
              )} ${validate_component(Checkbox, "Checkbox").$$render(
                $$result,
                {
                  id: "after_iteration_" + func,
                  checked: functionSettings[func].after_iteration
                },
                {
                  checked: ($$value) => {
                    functionSettings[func].after_iteration = $$value;
                    $$settled = false;
                  }
                },
                {
                  default: () => {
                    return `After iteration
							`;
                  }
                }
              )} ${validate_component(Checkbox, "Checkbox").$$render(
                $$result,
                {
                  id: "after_simulation_" + func,
                  checked: functionSettings[func].after_simulation
                },
                {
                  checked: ($$value) => {
                    functionSettings[func].after_simulation = $$value;
                    $$settled = false;
                  }
                },
                {
                  default: () => {
                    return `After simulation
							`;
                  }
                }
              )}</div> `;
            }
          })}`;
        })}`;
      }
    })} ${validate_component(Button, "Button").$$render($$result, { class: "my-2" }, {}, {
      default: () => {
        return `Save Choices`;
      }
    })}</div></div></div> ${validate_component(Modal, "Modal").$$render(
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
const css$1 = {
  code: ".code-editor.svelte-bhz2uh{width:100%;height:300px;font-family:monospace;margin-bottom:20px}",
  map: `{"version":3,"file":"OtherMethodLab.svelte","sources":["OtherMethodLab.svelte"],"sourcesContent":["<script>\\r\\n\\t// @ts-nocheck\\r\\n\\r\\n\\timport { Button, List, Li, Heading, P, Span, Modal } from 'flowbite-svelte';\\r\\n\\timport { ExclamationCircleOutline } from 'flowbite-svelte-icons';\\r\\n\\timport fileSaver from 'file-saver';\\r\\n\\timport CodeMirrorEditor from 'svelte-codemirror-editor';\\r\\n\\timport { python } from '@codemirror/lang-python';\\r\\n\\timport { onMount } from 'svelte';\\r\\n\\timport { invoke } from '@tauri-apps/api/tauri';\\r\\n\\timport { project } from '$lib/stores/projects';\\r\\n\\r\\n\\tlet code = '';\\r\\n\\r\\n\\tlet errorModalOpen = false;\\r\\n\\tlet latestError = 'error';\\r\\n\\r\\n\\tonMount(async () => {\\r\\n\\t\\tawait loadMethodsFile();\\r\\n\\t});\\r\\n\\r\\n\\tasync function loadMethodsFile() {\\r\\n\\t\\ttry {\\r\\n\\t\\t\\tconst result = await invoke('run_python_load_methods', {\\r\\n\\t\\t\\t\\tproject_name: $project.name\\r\\n\\t\\t\\t});\\r\\n\\t\\t\\tcode = JSON.parse(result).content;\\r\\n\\t\\t\\tconsole.log(code);\\r\\n\\t\\t} catch (error) {\\r\\n\\t\\t\\tconsole.error('Error getting methods from Python:', error);\\r\\n\\t\\t\\tlatestError = error;\\r\\n\\t\\t\\terrorModalOpen = true;\\r\\n\\t\\t}\\r\\n\\t}\\r\\n\\r\\n\\tasync function saveMethodsFile() {\\r\\n\\t\\ttry {\\r\\n\\t\\t\\tawait invoke('run_python_save_methods', {\\r\\n\\t\\t\\t\\tproject_name: $project.name,\\r\\n\\t\\t\\t\\tcode: code\\r\\n\\t\\t\\t});\\r\\n\\t\\t} catch (error) {\\r\\n\\t\\t\\tconsole.error('Error saving methods with Python', error);\\r\\n\\t\\t\\tlatestError = error;\\r\\n\\t\\t\\terrorModalOpen = true;\\r\\n\\t\\t}\\r\\n\\t}\\r\\n\\r\\n\\tfunction handleCodeChange(value) {\\r\\n\\t\\tcode = value;\\r\\n\\t}\\r\\n\\r\\n\\tfunction saveMethods() {\\r\\n\\t\\thandleCodeChange(code);\\r\\n\\t\\tconsole.log('Methods saved', code, functionSettings);\\r\\n\\t\\tsaveMethodsFile();\\r\\n\\t}\\r\\n\\r\\n\\tfunction downloadMethods() {\\r\\n\\t\\tconst blob = new Blob([code], { type: 'text/plain;charset=utf-8' });\\r\\n\\t\\tfileSaver(blob, 'methods.py');\\r\\n\\t}\\r\\n<\/script>\\r\\n\\r\\n<div class=\\"container mx-auto p-4\\">\\r\\n\\t<div class=\\"-mx-2 flex flex-wrap\\">\\r\\n\\t\\t<div class=\\"mb-4 w-3/4 px-2\\" style=\\"border-right: 1px solid #cecece;\\">\\r\\n\\t\\t\\t<Heading tag=\\"h2\\" class=\\"mb-2\\">Code View</Heading>\\r\\n\\t\\t\\t<P>After completing the functions, go back to Project or Settings to run the projects.</P>\\r\\n\\t\\t\\t<P>\\r\\n\\t\\t\\t\\tHere, we should provide user information about which simulation parameters they can use.</P\\r\\n\\t\\t\\t>\\r\\n\\t\\t\\t<Button class=\\"my-2\\" on:click={saveMethods}>Save Methods</Button>\\r\\n\\t\\t\\t<Button class=\\"my-2\\" on:click={downloadMethods}>Download Methods</Button>\\r\\n\\t\\t\\t<div class=\\"code-editor\\">\\r\\n\\t\\t\\t\\t<CodeMirrorEditor bind:value={code} lang={python()} />\\r\\n\\t\\t\\t</div>\\r\\n\\t\\t</div>\\r\\n\\t\\t<div class=\\"mb-4 w-1/4 px-2\\">\\r\\n\\t\\t\\t<Heading tag=\\"h2\\" class=\\"mb-3\\">Info</Heading>\\r\\n\\r\\n\\t\\t\\t<Heading\\r\\n\\t\\t\\t\\ttag=\\"h2\\"\\r\\n\\t\\t\\t\\tcustomSize=\\"text-lg font-semibold\\"\\r\\n\\t\\t\\t\\tclass=\\"mb-2 text-lg font-semibold text-gray-900 dark:text-white\\"\\r\\n\\t\\t\\t\\t>Implementing custom simulation</Heading\\r\\n\\t\\t\\t>\\r\\n\\t\\t\\t<List tag=\\"ul\\" class=\\"space-y-1 text-gray-600 dark:text-gray-400\\">\\r\\n\\t\\t\\t\\t<Li>For the custom simulation, you must implement an <Span>update</Span> method.</Li>\\r\\n\\t\\t\\t\\t<Li><Span>Update</Span> method should be placed on top.</Li>\\r\\n\\t\\t\\t\\t<Li>This will be the logic that will be called every iteration.</Li>\\r\\n\\t\\t\\t\\t<Li>You can call helper methods inside others, including update method.</Li>\\r\\n\\t\\t\\t\\t<Li>Update method only takes network as the input (def update(network)).</Li>\\r\\n\\t\\t\\t\\t<Li>Network can be passed to other methods as a parameter in the update method.</Li>\\r\\n\\t\\t\\t\\t<Li>Return the infected nodes/edges to save them into a separate file.</Li>\\r\\n\\t\\t\\t</List>\\r\\n\\t\\t</div>\\r\\n\\t</div>\\r\\n</div>\\r\\n\\r\\n<Modal bind:open={errorModalOpen} size=\\"xs\\" autoclose>\\r\\n\\t<div class=\\"text-center\\">\\r\\n\\t\\t<ExclamationCircleOutline class=\\"mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200\\" />\\r\\n\\t\\t<h3 class=\\"mb-1 text-xl font-normal text-gray-800 dark:text-gray-400\\">Error:</h3>\\r\\n\\t\\t<P class=\\"mb-5 text-center text-lg font-normal text-gray-700 dark:text-gray-400\\"\\r\\n\\t\\t\\t>{latestError}</P\\r\\n\\t\\t>\\r\\n\\t\\t<Button\\r\\n\\t\\t\\tcolor=\\"red\\"\\r\\n\\t\\t\\tclass=\\"me-2\\"\\r\\n\\t\\t\\ton:click={() => {\\r\\n\\t\\t\\t\\terrorModalOpen = false;\\r\\n\\t\\t\\t}}>Try again</Button\\r\\n\\t\\t>\\r\\n\\t</div>\\r\\n</Modal>\\r\\n\\r\\n<style>\\r\\n\\t.code-editor {\\r\\n\\t\\twidth: 100%;\\r\\n\\t\\theight: 300px;\\r\\n\\t\\tfont-family: monospace;\\r\\n\\t\\tmargin-bottom: 20px;\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAsHC,0BAAa,CACZ,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,KAAK,CACb,WAAW,CAAE,SAAS,CACtB,aAAa,CAAE,IAChB"}`
};
const OtherMethodLab = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_project;
  $$unsubscribe_project = subscribe(project, (value) => value);
  let code = "";
  let errorModalOpen = false;
  let latestError = "error";
  $$result.css.add(css$1);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="container mx-auto p-4"><div class="-mx-2 flex flex-wrap"><div class="mb-4 w-3/4 px-2" style="border-right: 1px solid #cecece;">${validate_component(Heading, "Heading").$$render($$result, { tag: "h2", class: "mb-2" }, {}, {
      default: () => {
        return `Code View`;
      }
    })} ${validate_component(P, "P").$$render($$result, {}, {}, {
      default: () => {
        return `After completing the functions, go back to Project or Settings to run the projects.`;
      }
    })} ${validate_component(P, "P").$$render($$result, {}, {}, {
      default: () => {
        return `Here, we should provide user information about which simulation parameters they can use.`;
      }
    })} ${validate_component(Button, "Button").$$render($$result, { class: "my-2" }, {}, {
      default: () => {
        return `Save Methods`;
      }
    })} ${validate_component(Button, "Button").$$render($$result, { class: "my-2" }, {}, {
      default: () => {
        return `Download Methods`;
      }
    })} <div class="code-editor svelte-bhz2uh">${validate_component(CodeMirror, "CodeMirrorEditor").$$render(
      $$result,
      { lang: python(), value: code },
      {
        value: ($$value) => {
          code = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div> <div class="mb-4 w-1/4 px-2">${validate_component(Heading, "Heading").$$render($$result, { tag: "h2", class: "mb-3" }, {}, {
      default: () => {
        return `Info`;
      }
    })} ${validate_component(Heading, "Heading").$$render(
      $$result,
      {
        tag: "h2",
        customSize: "text-lg font-semibold",
        class: "mb-2 text-lg font-semibold text-gray-900 dark:text-white"
      },
      {},
      {
        default: () => {
          return `Implementing custom simulation`;
        }
      }
    )} ${validate_component(List, "List").$$render(
      $$result,
      {
        tag: "ul",
        class: "space-y-1 text-gray-600 dark:text-gray-400"
      },
      {},
      {
        default: () => {
          return `${validate_component(Li, "Li").$$render($$result, {}, {}, {
            default: () => {
              return `For the custom simulation, you must implement an ${validate_component(Span, "Span").$$render($$result, {}, {}, {
                default: () => {
                  return `update`;
                }
              })} method.`;
            }
          })} ${validate_component(Li, "Li").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Span, "Span").$$render($$result, {}, {}, {
                default: () => {
                  return `Update`;
                }
              })} method should be placed on top.`;
            }
          })} ${validate_component(Li, "Li").$$render($$result, {}, {}, {
            default: () => {
              return `This will be the logic that will be called every iteration.`;
            }
          })} ${validate_component(Li, "Li").$$render($$result, {}, {}, {
            default: () => {
              return `You can call helper methods inside others, including update method.`;
            }
          })} ${validate_component(Li, "Li").$$render($$result, {}, {}, {
            default: () => {
              return `Update method only takes network as the input (def update(network)).`;
            }
          })} ${validate_component(Li, "Li").$$render($$result, {}, {}, {
            default: () => {
              return `Network can be passed to other methods as a parameter in the update method.`;
            }
          })} ${validate_component(Li, "Li").$$render($$result, {}, {}, {
            default: () => {
              return `Return the infected nodes/edges to save them into a separate file.`;
            }
          })}`;
        }
      }
    )}</div></div></div> ${validate_component(Modal, "Modal").$$render(
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
const css = {
  code: ".code-editor.svelte-bhz2uh{width:100%;height:300px;font-family:monospace;margin-bottom:20px}",
  map: `{"version":3,"file":"CustomMethodLab.svelte","sources":["CustomMethodLab.svelte"],"sourcesContent":["<script>\\r\\n\\t// @ts-nocheck\\r\\n\\r\\n\\timport { Button, Checkbox, Listgroup, ListgroupItem, Heading, P, Modal } from 'flowbite-svelte';\\r\\n\\timport { ExclamationCircleOutline } from 'flowbite-svelte-icons';\\r\\n\\timport fileSaver from 'file-saver';\\r\\n\\timport CodeMirrorEditor from 'svelte-codemirror-editor';\\r\\n\\timport { python } from '@codemirror/lang-python';\\r\\n\\timport { onMount } from 'svelte';\\r\\n\\timport { invoke } from '@tauri-apps/api/tauri';\\r\\n\\timport { project } from '$lib/stores/projects';\\r\\n\\r\\n\\tlet code = '';\\r\\n\\tlet functions = [];\\r\\n\\tlet functionSettings = {};\\r\\n\\r\\n\\tlet errorModalOpen = false;\\r\\n\\tlet latestError = 'error';\\r\\n\\r\\n\\tonMount(async () => {\\r\\n\\t\\tawait loadMethodsFile();\\r\\n\\t});\\r\\n\\r\\n\\tasync function loadMethodsFile() {\\r\\n\\t\\ttry {\\r\\n\\t\\t\\tconst result = await invoke('run_python_load_methods', {\\r\\n\\t\\t\\t\\tproject_name: $project.name\\r\\n\\t\\t\\t});\\r\\n\\t\\t\\tcode = JSON.parse(result).content;\\r\\n\\t\\t\\tconsole.log(code);\\r\\n\\t\\t} catch (error) {\\r\\n\\t\\t\\tconsole.error('Error getting methods from Python:', error);\\r\\n\\t\\t\\tlatestError = error;\\r\\n\\t\\t\\terrorModalOpen = true;\\r\\n\\t\\t}\\r\\n\\t}\\r\\n\\r\\n\\tasync function saveMethodsFile() {\\r\\n\\t\\ttry {\\r\\n\\t\\t\\tawait invoke('run_python_save_methods', {\\r\\n\\t\\t\\t\\tproject_name: $project.name,\\r\\n\\t\\t\\t\\tcode: code\\r\\n\\t\\t\\t});\\r\\n\\t\\t} catch (error) {\\r\\n\\t\\t\\tconsole.error('Error saving methods with Python', error);\\r\\n\\t\\t\\tlatestError = error;\\r\\n\\t\\t\\terrorModalOpen = true;\\r\\n\\t\\t}\\r\\n\\t}\\r\\n\\r\\n\\tasync function saveListView() {\\r\\n\\t\\ttry {\\r\\n\\t\\t\\tawait invoke('run_python_save_methods_list_view', {\\r\\n\\t\\t\\t\\tproject_name: $project.name,\\r\\n\\t\\t\\t\\tlist_view: JSON.stringify(functionSettings)\\r\\n\\t\\t\\t});\\r\\n\\r\\n\\t\\t\\tconsole.log('List view saved successfully');\\r\\n\\t\\t} catch (error) {\\r\\n\\t\\t\\tconsole.error('Error saving list view with Python', error);\\r\\n\\t\\t\\tlatestError = error;\\r\\n\\t\\t\\terrorModalOpen = true;\\r\\n\\t\\t}\\r\\n\\t}\\r\\n\\r\\n\\tfunction extractFunctionNames(code) {\\r\\n\\t\\tconst regex = /def\\\\s+(\\\\w+)\\\\s*\\\\(/g;\\r\\n\\t\\tlet match;\\r\\n\\t\\tconst result = [];\\r\\n\\t\\twhile ((match = regex.exec(code)) !== null) {\\r\\n\\t\\t\\tresult.push(match[1]);\\r\\n\\t\\t}\\r\\n\\t\\treturn result;\\r\\n\\t}\\r\\n\\r\\n\\tfunction handleCodeChange(value) {\\r\\n\\t\\tcode = value;\\r\\n\\t\\tfunctions = extractFunctionNames(code);\\r\\n\\t\\tfunctions.forEach((func) => {\\r\\n\\t\\t\\tif (!functionSettings[func]) {\\r\\n\\t\\t\\t\\tfunctionSettings[func] = {\\r\\n\\t\\t\\t\\t\\tbefore_iteration: false,\\r\\n\\t\\t\\t\\t\\tevery_iteration_agent: false,\\r\\n\\t\\t\\t\\t\\tafter_iteration: false,\\r\\n\\t\\t\\t\\t\\tafter_simulation: false\\r\\n\\t\\t\\t\\t};\\r\\n\\t\\t\\t}\\r\\n\\t\\t});\\r\\n\\t}\\r\\n\\r\\n\\tfunction handleCheckboxChange(func, key, value) {\\r\\n\\t\\tfunctionSettings[func][key] = value;\\r\\n\\t}\\r\\n\\r\\n\\tfunction saveMethods() {\\r\\n\\t\\thandleCodeChange(code);\\r\\n\\t\\tconsole.log('Methods saved', code, functionSettings);\\r\\n\\t\\tsaveMethodsFile();\\r\\n\\t}\\r\\n\\r\\n\\tfunction downloadMethods() {\\r\\n\\t\\tconst blob = new Blob([code], { type: 'text/plain;charset=utf-8' });\\r\\n\\t\\tfileSaver(blob, 'methods.py');\\r\\n\\t}\\r\\n<\/script>\\r\\n\\r\\n<div class=\\"container mx-auto p-4\\">\\r\\n\\t<div class=\\"-mx-2 flex flex-wrap\\">\\r\\n\\t\\t<div class=\\"mb-4 w-3/4 px-2\\" style=\\"border-right: 1px solid #cecece;\\">\\r\\n\\t\\t\\t<Heading tag=\\"h2\\" class=\\"mb-2\\">Code View</Heading>\\r\\n\\t\\t\\t<P>All methods are required to follow two rules:</P>\\r\\n\\t\\t\\t<ol>\\r\\n\\t\\t\\t\\t<li>1. Take \\"network\\" as the parameter</li>\\r\\n\\t\\t\\t\\t<li>\\r\\n\\t\\t\\t\\t\\t2. To save a value in every iteration, return the result. It will be automatically saved\\r\\n\\t\\t\\t\\t\\tin a file, named as function_name.json, in every snapshot period.\\r\\n\\t\\t\\t\\t</li>\\r\\n\\t\\t\\t</ol>\\r\\n\\t\\t\\t<P class=\\"my-2 text-sm text-gray-500\\">\\r\\n\\t\\t\\t\\tsnapshot period: Denotes the \\"period\\" which the network and results of the custom methods\\r\\n\\t\\t\\t\\twill be written to files. If snapshot period is 1, data will be saved in each iteration.\\r\\n\\t\\t\\t</P>\\r\\n\\t\\t\\t<P>More information regarding custom methods:</P>\\r\\n\\t\\t\\t<ul>\\r\\n\\t\\t\\t\\t<li>- Any library installed can be imported and used.</li>\\r\\n\\t\\t\\t\\t<li>- Helper methods do not have to be passed to \\"run simulation\\" method.</li>\\r\\n\\t\\t\\t\\t<li>- Methods can take parameters other than *network*.</li>\\r\\n\\t\\t\\t</ul>\\r\\n\\r\\n\\t\\t\\t<P class=\\"my-2 text-sm text-gray-500\\">\\r\\n\\t\\t\\t\\tNote: Make sure to save both views before leaving the page if you want them to be used in\\r\\n\\t\\t\\t\\tthe next simulation.\\r\\n\\t\\t\\t</P>\\r\\n\\t\\t\\t<Button class=\\"my-2\\" on:click={saveMethods}>Save Methods</Button>\\r\\n\\t\\t\\t<Button class=\\"my-2\\" on:click={downloadMethods}>Download Methods</Button>\\r\\n\\t\\t\\t<div class=\\"code-editor\\">\\r\\n\\t\\t\\t\\t<CodeMirrorEditor bind:value={code} lang={python()} />\\r\\n\\t\\t\\t</div>\\r\\n\\t\\t</div>\\r\\n\\t\\t<div class=\\"mb-4 w-1/4 px-2\\">\\r\\n\\t\\t\\t<Heading tag=\\"h2\\" class=\\"mb-2\\">List View</Heading>\\r\\n\\t\\t\\t<P>\\r\\n\\t\\t\\t\\tChoose when do you want to call each function. If no option is selected, it will not be\\r\\n\\t\\t\\t\\tcalled explicitly. This can be useful in helper methods which you call from other methods.\\r\\n\\t\\t\\t</P>\\r\\n\\r\\n\\t\\t\\t<Listgroup class=\\"my-4\\">\\r\\n\\t\\t\\t\\t{#each functions as func}\\r\\n\\t\\t\\t\\t\\t<ListgroupItem>\\r\\n\\t\\t\\t\\t\\t\\t<P><b>{func}</b></P>\\r\\n\\t\\t\\t\\t\\t\\t<div class=\\"mt-2\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t<Checkbox\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tid=\\"before_iteration_{func}\\"\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tbind:checked={functionSettings[func].before_iteration}\\r\\n\\t\\t\\t\\t\\t\\t\\t>\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tBefore iteration\\r\\n\\t\\t\\t\\t\\t\\t\\t</Checkbox>\\r\\n\\t\\t\\t\\t\\t\\t\\t<Checkbox\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tid=\\"every_iteration_agent_{func}\\"\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tbind:checked={functionSettings[func].every_iteration_agent}\\r\\n\\t\\t\\t\\t\\t\\t\\t>\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tEvery iteration agent\\r\\n\\t\\t\\t\\t\\t\\t\\t</Checkbox>\\r\\n\\t\\t\\t\\t\\t\\t\\t<Checkbox\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tid=\\"after_iteration_{func}\\"\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tbind:checked={functionSettings[func].after_iteration}\\r\\n\\t\\t\\t\\t\\t\\t\\t>\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tAfter iteration\\r\\n\\t\\t\\t\\t\\t\\t\\t</Checkbox>\\r\\n\\t\\t\\t\\t\\t\\t\\t<Checkbox\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tid=\\"after_simulation_{func}\\"\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tbind:checked={functionSettings[func].after_simulation}\\r\\n\\t\\t\\t\\t\\t\\t\\t>\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tAfter simulation\\r\\n\\t\\t\\t\\t\\t\\t\\t</Checkbox>\\r\\n\\t\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t\\t</ListgroupItem>\\r\\n\\t\\t\\t\\t{/each}\\r\\n\\t\\t\\t</Listgroup>\\r\\n\\t\\t\\t<Button class=\\"my-2\\" on:click={saveListView}>Save Choices</Button>\\r\\n\\t\\t</div>\\r\\n\\t</div>\\r\\n</div>\\r\\n\\r\\n<Modal bind:open={errorModalOpen} size=\\"xs\\" autoclose>\\r\\n\\t<div class=\\"text-center\\">\\r\\n\\t\\t<ExclamationCircleOutline class=\\"mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200\\" />\\r\\n\\t\\t<h3 class=\\"mb-1 text-xl font-normal text-gray-800 dark:text-gray-400\\">Error:</h3>\\r\\n\\t\\t<P class=\\"mb-5 text-center text-lg font-normal text-gray-700 dark:text-gray-400\\"\\r\\n\\t\\t\\t>{latestError}</P\\r\\n\\t\\t>\\r\\n\\t\\t<Button\\r\\n\\t\\t\\tcolor=\\"red\\"\\r\\n\\t\\t\\tclass=\\"me-2\\"\\r\\n\\t\\t\\ton:click={() => {\\r\\n\\t\\t\\t\\terrorModalOpen = false;\\r\\n\\t\\t\\t}}>Try again</Button\\r\\n\\t\\t>\\r\\n\\t</div>\\r\\n</Modal>\\r\\n\\r\\n<style>\\r\\n\\t.code-editor {\\r\\n\\t\\twidth: 100%;\\r\\n\\t\\theight: 300px;\\r\\n\\t\\tfont-family: monospace;\\r\\n\\t\\tmargin-bottom: 20px;\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AA0MC,0BAAa,CACZ,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,KAAK,CACb,WAAW,CAAE,SAAS,CACtB,aAAa,CAAE,IAChB"}`
};
const CustomMethodLab = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_project;
  $$unsubscribe_project = subscribe(project, (value) => value);
  let code = "";
  let functions = [];
  let functionSettings = {};
  let errorModalOpen = false;
  let latestError = "error";
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="container mx-auto p-4"><div class="-mx-2 flex flex-wrap"><div class="mb-4 w-3/4 px-2" style="border-right: 1px solid #cecece;">${validate_component(Heading, "Heading").$$render($$result, { tag: "h2", class: "mb-2" }, {}, {
      default: () => {
        return `Code View`;
      }
    })} ${validate_component(P, "P").$$render($$result, {}, {}, {
      default: () => {
        return `All methods are required to follow two rules:`;
      }
    })} <ol data-svelte-h="svelte-ac9dla"><li>1. Take &quot;network&quot; as the parameter</li> <li>2. To save a value in every iteration, return the result. It will be automatically saved
					in a file, named as function_name.json, in every snapshot period.</li></ol> ${validate_component(P, "P").$$render($$result, { class: "my-2 text-sm text-gray-500" }, {}, {
      default: () => {
        return `snapshot period: Denotes the &quot;period&quot; which the network and results of the custom methods
				will be written to files. If snapshot period is 1, data will be saved in each iteration.`;
      }
    })} ${validate_component(P, "P").$$render($$result, {}, {}, {
      default: () => {
        return `More information regarding custom methods:`;
      }
    })} <ul data-svelte-h="svelte-1kt2ker"><li>- Any library installed can be imported and used.</li> <li>- Helper methods do not have to be passed to &quot;run simulation&quot; method.</li> <li>- Methods can take parameters other than *network*.</li></ul> ${validate_component(P, "P").$$render($$result, { class: "my-2 text-sm text-gray-500" }, {}, {
      default: () => {
        return `Note: Make sure to save both views before leaving the page if you want them to be used in
				the next simulation.`;
      }
    })} ${validate_component(Button, "Button").$$render($$result, { class: "my-2" }, {}, {
      default: () => {
        return `Save Methods`;
      }
    })} ${validate_component(Button, "Button").$$render($$result, { class: "my-2" }, {}, {
      default: () => {
        return `Download Methods`;
      }
    })} <div class="code-editor svelte-bhz2uh">${validate_component(CodeMirror, "CodeMirrorEditor").$$render(
      $$result,
      { lang: python(), value: code },
      {
        value: ($$value) => {
          code = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div> <div class="mb-4 w-1/4 px-2">${validate_component(Heading, "Heading").$$render($$result, { tag: "h2", class: "mb-2" }, {}, {
      default: () => {
        return `List View`;
      }
    })} ${validate_component(P, "P").$$render($$result, {}, {}, {
      default: () => {
        return `Choose when do you want to call each function. If no option is selected, it will not be
				called explicitly. This can be useful in helper methods which you call from other methods.`;
      }
    })} ${validate_component(Listgroup, "Listgroup").$$render($$result, { class: "my-4" }, {}, {
      default: () => {
        return `${each(functions, (func) => {
          return `${validate_component(ListgroupItem, "ListgroupItem").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(P, "P").$$render($$result, {}, {}, {
                default: () => {
                  return `<b>${escape(func)}</b>`;
                }
              })} <div class="mt-2">${validate_component(Checkbox, "Checkbox").$$render(
                $$result,
                {
                  id: "before_iteration_" + func,
                  checked: functionSettings[func].before_iteration
                },
                {
                  checked: ($$value) => {
                    functionSettings[func].before_iteration = $$value;
                    $$settled = false;
                  }
                },
                {
                  default: () => {
                    return `Before iteration
							`;
                  }
                }
              )} ${validate_component(Checkbox, "Checkbox").$$render(
                $$result,
                {
                  id: "every_iteration_agent_" + func,
                  checked: functionSettings[func].every_iteration_agent
                },
                {
                  checked: ($$value) => {
                    functionSettings[func].every_iteration_agent = $$value;
                    $$settled = false;
                  }
                },
                {
                  default: () => {
                    return `Every iteration agent
							`;
                  }
                }
              )} ${validate_component(Checkbox, "Checkbox").$$render(
                $$result,
                {
                  id: "after_iteration_" + func,
                  checked: functionSettings[func].after_iteration
                },
                {
                  checked: ($$value) => {
                    functionSettings[func].after_iteration = $$value;
                    $$settled = false;
                  }
                },
                {
                  default: () => {
                    return `After iteration
							`;
                  }
                }
              )} ${validate_component(Checkbox, "Checkbox").$$render(
                $$result,
                {
                  id: "after_simulation_" + func,
                  checked: functionSettings[func].after_simulation
                },
                {
                  checked: ($$value) => {
                    functionSettings[func].after_simulation = $$value;
                    $$settled = false;
                  }
                },
                {
                  default: () => {
                    return `After simulation
							`;
                  }
                }
              )}</div> `;
            }
          })}`;
        })}`;
      }
    })} ${validate_component(Button, "Button").$$render($$result, { class: "my-2" }, {}, {
      default: () => {
        return `Save Choices`;
      }
    })}</div></div></div> ${validate_component(Modal, "Modal").$$render(
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
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $simulationType, $$unsubscribe_simulationType;
  let $nodeOrEdge, $$unsubscribe_nodeOrEdge;
  let $project, $$unsubscribe_project;
  $$unsubscribe_simulationType = subscribe(simulationType, (value) => $simulationType = value);
  $$unsubscribe_nodeOrEdge = subscribe(nodeOrEdge, (value) => $nodeOrEdge = value);
  $$unsubscribe_project = subscribe(project, (value) => $project = value);
  $$unsubscribe_simulationType();
  $$unsubscribe_nodeOrEdge();
  $$unsubscribe_project();
  return `<div class="text-center">${validate_component(Heading, "Heading").$$render(
    $$result,
    {
      tag: "h1",
      class: "mb-4",
      customSize: "text-3xl font-bold  md:text-4xl lg:text-5xl"
    },
    {},
    {
      default: () => {
        return `Method Lab`;
      }
    }
  )}</div> ${$simulationType === "diffusion" ? `${validate_component(Heading, "Heading").$$render($$result, { tag: "h6", class: "text-center" }, {}, {
    default: () => {
      return `Project: ${validate_component(Span, "Span").$$render($$result, { gradient: true }, {}, {
        default: () => {
          return `${escape($project.name)}`;
        }
      })}`;
    }
  })} ${validate_component(DiffusionMethodLab, "DiffusionMethodLab").$$render($$result, {}, {}, {})}` : `${$simulationType === "other" && $nodeOrEdge === "edge" ? `${validate_component(Heading, "Heading").$$render($$result, { tag: "h6", class: "text-center" }, {}, {
    default: () => {
      return `Project: ${validate_component(Span, "Span").$$render($$result, { gradient: true }, {}, {
        default: () => {
          return `${escape($project.name)}`;
        }
      })}`;
    }
  })} ${validate_component(OtherMethodLab, "OtherMethodLab").$$render($$result, {}, {}, {})}` : `${$simulationType === "other" && $nodeOrEdge === "node" ? `${validate_component(Heading, "Heading").$$render($$result, { tag: "h6", class: "text-center" }, {}, {
    default: () => {
      return `Project: ${validate_component(Span, "Span").$$render($$result, { gradient: true }, {}, {
        default: () => {
          return `${escape($project.name)}`;
        }
      })}`;
    }
  })} ${validate_component(CustomMethodLab, "CustomMethodLab").$$render($$result, {}, {}, {})}` : `${validate_component(P, "P").$$render($$result, {}, {}, {
    default: () => {
      return `Simulation type is not defined yet. Select one from the project page.`;
    }
  })}`}`}`}`;
});
export {
  Page as default
};
