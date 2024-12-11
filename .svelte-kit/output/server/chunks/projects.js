import { w as writable } from "./index.js";
const project = writable({
  name: "",
  date: "",
  info: ""
});
const simulationName = writable("");
const simulationDirectory = writable("");
const simulationType = writable("other");
const nodeOrEdge = writable("node");
const runNumber = writable(1);
export {
  simulationDirectory as a,
  simulationType as b,
  nodeOrEdge as n,
  project as p,
  runNumber as r,
  simulationName as s
};
