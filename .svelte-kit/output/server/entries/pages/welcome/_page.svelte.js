import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
const Home = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main data-svelte-h="svelte-1bcxzdn"><h1>Welcome to the Home Page2</h1> </main>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Home, "Home").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
