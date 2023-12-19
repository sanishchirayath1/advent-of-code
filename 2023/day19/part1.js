import { syncReadFile } from "../utils.js";

let lines = syncReadFile(`./input.txt`, "\n\n");
// sample.txt expects 19114 as answer for part 1
// sample.txt expects 167409079868000 as answer for part 2

// Parse the input
let [workflows, parts] = lines;

let partsArr = parts.split("\n").map((line) => {
  let map = new Map();
  line.match(/[a-z]=\d+/g).forEach((rating) => {
    let [key, value] = rating.split("=");
    map.set(key, parseInt(value));
  });
  return map;
});

// This is just an experiment to see if I can create a workflow map with functions
// It actually works, but I don't think it's the best solution for this problem
let workflowsMap = new Map();
workflows.split("\n").forEach((line) => {
  let processes = line.match(/([a-z](<|>)\d+:([a-z]+|(A|R))|([a-z]+|(A|R)))/g);
  let key = processes[0];
  // we will create a function that return "A", "R" or key of the next process. and will add it to the repective key in the map
  let steps = processes.slice(1);

  steps = steps.map((step) => {
    let index = step.indexOf(":");
    if (index === -1) {
      return () => [true, step];
    }

    let [condtion, next] = step.split(":");
    let [category, op, value] = condtion.split(/(<|>)/);
    return (map) => {
      if (op === "<") {
        return map.get(category) < value ? [true, next] : [false, ""];
      } else {
        return map.get(category) > value ? [true, next] : [false, ""];
      }
    };
  });

  function getNext(map) {
    for (let i = 0; i < steps.length; i++) {
      let [condition, next] = steps[i](map);
      if (condition) {
        return next;
      }
    }
  }

  workflowsMap.set(key, getNext);
});

console.log(workflowsMap);

let acceptedParts = [];
let rejectedParts = [];

partsArr.forEach((map) => {
  let startkey = "in";
  while (startkey !== "A" && startkey !== "R") {
    let fn = workflowsMap.get(startkey);
    startkey = fn(map);
  }
  if (startkey === "A") {
    acceptedParts.push(map);
  } else {
    rejectedParts.push(map);
  }
});

// Accepted parts Sum
let total = 0;

acceptedParts.forEach((map) => {
  let localSum = map.get("x") + map.get("m") + map.get("a") + map.get("s");
  total += localSum;
});

console.log("part1", total);
