import { syncReadFile } from "../utils.js";

let arr = syncReadFile("./sample.txt", "\n\n");
// sample.txt expects 31 as answer for part 1
// sample.txt expects ___ as answer for part 2

console.log("arr : ", arr);
// create 2D Array
let arr2D = arr.map((item) => item.split("\n"));
arr2D = arr2D.map((item) => item.map((item) => item.split("")));
console.log("arr2D : ", arr2D);

// Part 1
let start = "S";
let end = "E";

let startingPoint = [];
let endingPoint = [];

for (let i = 0; i < arr2D.length; i++) {
  for (let j = 0; j < arr2D[i].length; j++) {
    if (arr2D[i][j] === start) {
      startingPoint.push([i, j]);
    } else if (arr2D[i][j] === end) {
      endingPoint.push([i, j]);
    }
  }
}

let visited = new Set();

let queue = [];

queue.push(startingPoint[0]);

let count = 0;

// we will use breadth first search
while (queue.length > 0) {
  let [x, y] = queue.shift();
  let key = getKey([x, y]);
  if (visited.has(key)) {
    continue;
  }
  visited.add(key);
  if (arr2D[x][y] === end) {
    console.log("count : ", count);
    break;
  }
  let neighbors = getNeighbors(x, y, arr2D);
  queue.push(...neighbors);
  count++;
}

function getNeighbors(x, y, arr2D) {
  let neighbors = [];
  if (x > 0 && arr2D[x - 1][y] !== "#") {
    neighbors.push([x - 1, y]);
  }
  if (x < arr2D.length - 1 && arr2D[x + 1][y] !== "#") {
    neighbors.push([x + 1, y]);
  }
  if (y > 0 && arr2D[x][y - 1] !== "#") {
    neighbors.push([x, y - 1]);
  }
  if (y < arr2D[0].length - 1 && arr2D[x][y + 1] !== "#") {
    neighbors.push([x, y + 1]);
  }
  return neighbors;
}

function getKey([x, y]) {
  return x + "," + y;
}
