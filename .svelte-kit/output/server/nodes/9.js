

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/welcome/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/9.CqEpGKRW.js","_app/immutable/chunks/scheduler.CXlSaMum.js","_app/immutable/chunks/index.BuDDw201.js"];
export const stylesheets = [];
export const fonts = [];
