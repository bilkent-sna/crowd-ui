

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/welcome/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/8.C4oBTLEH.js","_app/immutable/chunks/scheduler.Ck4U5udU.js","_app/immutable/chunks/index.BoqadT_z.js"];
export const stylesheets = [];
export const fonts = [];
