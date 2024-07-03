

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/welcome/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/8.C5yKhGlV.js","_app/immutable/chunks/scheduler.Wo7oq_r8.js","_app/immutable/chunks/index.dOt571q0.js"];
export const stylesheets = [];
export const fonts = [];
