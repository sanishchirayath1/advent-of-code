import { syncReadFile } from "../utils.js";

let lines = syncReadFile("./input.txt", "\n\n");
// sample.txt expects 6 as answer for part 1
// sample2.txt expects 2 as answer for part 2

// Parse the input

let directions = lines[0].split("");
let nodes = lines[1].split("\n");
let graph = new Map();

function createGraph(nodes) {
  for (let i = 0; i < nodes.length; i++) {
    let nodeStr = nodes[i];
    let node = nodeStr.split(" = ")[0];
    let childrenStr = nodeStr.split(" = ")[1];
    let children = childrenStr.slice(1, childrenStr.length - 1).split(", ");
    graph.set(node, children);
  }
}

createGraph(nodes);

let start = "AAA";
let end = "ZZZ";
let stepsToReachEnd = 0;
let current = start;

// Part 1
while (current !== end) {
  let index = stepsToReachEnd % directions.length;
  let direction = directions[index];
  current = direction === "L" ? graph.get(current)[0] : graph.get(current)[1];
  stepsToReachEnd++;
}

console.log("Part 1: ", stepsToReachEnd);

// part 2
let currentNodes = [...graph.keys()].filter((key) => key.endsWith("A"));
console.log(currentNodes);

let stepsArray = [];

for (let i = 0; i < currentNodes.length; i++) {
  let stepToReachEnd = 0;
  let instructionIndex = 0;
  let current = currentNodes[i];

  while (!current.endsWith("Z")) {
    if (instructionIndex === directions.length) {
      instructionIndex = 0;
    }

    let direction = directions[instructionIndex];
    current = direction === "L" ? graph.get(current)[0] : graph.get(current)[1];
    stepToReachEnd++;
    instructionIndex++;
  }
  console.log(stepToReachEnd);
  stepsArray.push(stepToReachEnd);
}

const stepToReachEnd = stepsArray.reduce((acc, curr) => lcm(acc, curr), 1);

console.log("Part 2: ", stepToReachEnd);

//Helper functions
function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

function allNodesEndsWithZ(nodes) {
  return nodes.every((node) => endsWith(node, "Z"));
}
function endsWith(string, substring) {
  return string.indexOf(substring) === string.length - substring.length;
}
