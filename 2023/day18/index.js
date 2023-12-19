import { syncReadFile } from "../utils.js";

let lines = syncReadFile(`./sample.txt`, "\n");
// sample.txt expects 62 as answer for part 1
// sample.txt expects 145 as answer for part 2

// Parse the input
let digPlan = lines.map((line) => {
  let op = line.match(/[A-Z]/);
  let digLen = line.match(/\d+/);
  let color = line.match(/#[a-z0-9]+/);

  return {
    op: op[0],
    digLen: parseInt(digLen[0]),
    color: color[0],
  };
});

console.log(digPlan);

// Part 1
let xMin = Infinity;
let xMax = -Infinity;
let yMin = Infinity;
let yMax = -Infinity;

let currentX = 0;
let currentY = 0;

for (let i = 0; i < digPlan.length; i++) {
  let op = digPlan[i].op;
  let digLen = digPlan[i].digLen;

  switch (op) {
    case "R":
      currentX += digLen;
      xMax = Math.max(xMax, currentX);
      break;
    case "L":
      currentX -= digLen;
      xMin = Math.min(xMin, currentX);
      break;
    case "U":
      currentY += digLen;
      yMax = Math.max(yMax, currentY);
      break;
    case "D":
      currentY -= digLen;
      yMin = Math.min(yMin, currentY);
      break;
  }
}

// create grid
let cols = Math.abs(xMin) + xMax + 1;
let rows = Math.abs(yMin) + yMax + 1;

let grid = new Array(rows).fill(".").map(() => new Array(cols).fill("."));

console.log(xMax, yMax);

grid[0][0] = "#";

function startDigging() {
  let x = 0;
  let y = 0;

  for (let i = 0; i < digPlan.length; i++) {
    let op = digPlan[i].op;
    let digLen = digPlan[i].digLen;

    switch (op) {
      case "R":
        for (let j = 0; j < digLen; j++) {
          x++;
          grid[y - yMin][x - xMin] = "#";
        }
        break;
      case "L":
        for (let j = 0; j < digLen; j++) {
          x--;
          grid[y - yMin][x - xMin] = "#";
        }
        break;
      case "U":
        for (let j = 0; j < digLen; j++) {
          y++;
          grid[y - yMin][x - xMin] = "#";
        }
        break;
      case "D":
        for (let j = 0; j < digLen; j++) {
          y--;
          grid[y - yMin][x - xMin] = "#";
        }
        break;
    }
  }
}

startDigging();

console.log(grid);
