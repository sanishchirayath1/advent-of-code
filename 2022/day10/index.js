import { syncReadFile } from "../utils.js";

console.time("this");
let arr = syncReadFile("./input.txt");
// sample.txt expects 13140 as answer for part 1
// sample.txt expects something rendered as answer for part 2

arr = arr.map((item) => {
  return item.split(" ");
});

let map = new Map();
let cycleCount = 1;
let x = 1;

// creating the map
arr.forEach((item) => {
  let [action, addValue] = item;
  addValue = parseInt(addValue);

  if (action === "noop") {
    map.set(cycleCount, x);
    cycleCount++;
  } else {
    map.set(cycleCount, x);
    cycleCount++;
    map.set(cycleCount, x);
    x += addValue;
    cycleCount++;
  }
});

//part1
let start = 20;
let commonDiff = 40;
let sum = 0;

for (let i = start; i <= cycleCount; i = i + commonDiff) {
  sum += map.get(i) * i;
}

console.log("part1 >> ", sum);

// part2
let str = "";

for (let i = 1; i < cycleCount; i++) {
  if (isSpriteVisible(i)) {
    str += "#";
  } else {
    str += ".";
  }

  if (i % 40 === 0) {
    str += "\n";
  }
}

// helper function
function isSpriteVisible(cycle) {
  let diff = (cycle % 40 ? cycle % 40 : 40) - map.get(cycle);

  return diff >= 0 && diff <= 2;
}

console.log("part2 >> ");
console.log(str);
console.timeEnd("this");
