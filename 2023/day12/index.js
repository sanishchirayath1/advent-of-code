import { syncReadFile } from "../utils.js";

let lines = syncReadFile("./sample.txt", "\n");
// sample.txt expects 12 as answer for part 1
// sample2.txt expects 2 as answer for part 2

// Parse the input
let springData = lines.map((x) => x.split(" "));
springData = springData.map((x) => {
  let [arrangement, groupings] = x;
  let currentGroupings = [];
  arrangement = arrangement.split("");
  groupings = groupings.split(",").map((x) => parseInt(x));
  for (let i = 0; i < arrangement.length; i++) {
    if (arrangement[i] !== "#") {
      continue;
    }

    let count = 1;

    while (arrangement[i + count] === "#") {
      count++;
    }

    currentGroupings.push(count);
    i += count;
  }
  return { arrangement, currentGroupings, groupings };
});

console.log(springData);
