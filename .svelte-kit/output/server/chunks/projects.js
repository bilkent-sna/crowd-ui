import { w as writable } from "./index.js";
const project = writable({
  name: "",
  date: "",
  info: ""
});
const simulationName = writable("");
const simulationDirectory = writable("");
const simulationType = writable("");
const nodeOrEdge = writable("");
export {
  simulationDirectory as a,
  simulationType as b,
  nodeOrEdge as n,
  project as p,
  simulationName as s
};
