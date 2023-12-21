import { syncReadFile } from "../utils.js";

let lines = syncReadFile("./sample.txt", "\n\n");
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
      return {
        min: -Infinity,
        max: Infinity,
        category: null,
        next: step,
      };
    }

    let [condtion, next] = step.split(":");
    let [category, op, value] = condtion.split(/(<|>)/);

    if (op === "<") {
      return {
        min: -Infinity,
        max: parseInt(value),
        category,
        next,
      };
    } else {
      return {
        min: parseInt(value),
        max: Infinity,
        category,
        next,
      };
    }
  });

  workflowsMap.set(key, steps);
});

// console.log(workflowsMap);

let acceptedParts = [];
let rejectedParts = [];

partsArr.forEach((map) => {
  let startkey = "in";
  while (startkey !== "A" && startkey !== "R") {
    let steps = workflowsMap.get(startkey);

    for (let i = 0; i < steps.length; i++) {
      let { min, max, category, next } = steps[i];

      if (category === null) {
        startkey = next;
        break;
      }

      let value = map.get(category);

      if (value > min && value < max) {
        startkey = next;
        break;
      }
    }
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

// Part 2
let totalPossibleCombinations = 0;

function countCombinations() {
  let start = "in";
  let maxes = {
    x: 4000,
    m: 4000,
    a: 4000,
    s: 4000,
  };

  explorePath(start, maxes);

  function explorePath(key, maxes) {
    let steps = workflowsMap.get(key);

    for (let i = 0; i < steps.length; i++) {
      let { min, max, category, next } = steps[i];

      if (category === null) {
        if (next === "A") {
          totalPossibleCombinations +=
            maxes["x"] * maxes["m"] * maxes["a"] * maxes["s"];
          break;
        } else {
          explorePath(next, maxes);
        }
        continue;
      }

      let newMaxes = { ...maxes };
      let value = maxes[category];
      

      explorePath(next, newMaxes);
    }

    if (key === "A") {
      totalPossibleCombinations++;
    }
  }
}

console.log("part2", totalPossibleCombinations);
