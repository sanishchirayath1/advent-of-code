import { syncReadFile } from "../utils.js";

let arr = syncReadFile("./input.txt");
// sample.txt expects 13140 as answer for part 1
// sample.txt expects 36 as answer for part 2

arr = arr.map((item) => {
  return item.split(" ");
});

let map1 = new Map(); // part1
let map2 = new Map(); // part2

// console.log("arr : ", arr);
let cycleCount = 1;
let x = 1;

arr.forEach((item) => {
  let len = item.length;
  let action = item[0];
  let addValue = parseInt(item.slice(1, len));

  if (action === "noop") {
    map1.set(cycleCount, cycleCount * x);
    map2.set(cycleCount, x);
    cycleCount++;
  } else {
    map1.set(cycleCount, cycleCount * x);
    map2.set(cycleCount, x);
    cycleCount++;
    map1.set(cycleCount, cycleCount * x);
    map2.set(cycleCount, x);
    x += addValue;
    cycleCount++;
  }
});

// console.log("map : ", map);

let start = 20;
let commonDiff = 40;
let sum = 0;

for (let i = start; i < cycleCount; i = i + commonDiff) {
  sum += map1.get(i);
  console.log("cycle", i, "sum : ", sum);
}

console.log("part1 >> ", sum);

// part2
let str = "";

for (let i = 1; i <= cycleCount; i++) {
  let x = map2.get(i);

  if (isSpriteVisible(i, x)) {
    str += "#";
  } else {
    str += ".";
  }

  if (i % 40 === 0) {
    str += "\n";
  }
}

function isSpriteVisible(cycle, x) {
  let diff = (cycle % 40) - x;

  return diff >= 0 && diff <= 2;
}

console.log("part2 >> ");
console.log(str);
