import { syncReadFile } from "../utils.js";

let lines = syncReadFile("./input.txt", "\n");
// sample.txt expects 4 as answer for part 1
// sample2.txt expects 2 as answer for part 2

// Parse the input
let desert = lines.map((line) => {
  let data = line.split("");
  return data;
});

let startingPoint;

desert.forEach((row, i) => {
  row.forEach((col, j) => {
    if (col === "S") {
      startingPoint = [i, j];
    }
  });
});

let visited = new Set();
let currentPoint = [...startingPoint];
let idx = 0;

while (true) {
  // console.log(currentPoint);
  if (currentPoint === undefined) {
    console.log("Loop Ends");
    break;
  }
  // let [i, j] = currentPoint;
  // let key = `${i},${j}`;
  // if (key === startingPoint.join(",") && idx !== 0) {
  //   console.log("Loop Ends");
  //   break;
  // }
  // visited.add(key);
  currentPoint = getNextPoint(desert, currentPoint, visited);
  idx++;
}

console.log("Part 1: ", Math.ceil(idx / 2));

// console.log(desert);

// helper functions
function getNextPoint(desert, currentPoint, visited) {
  let nextPoint;
  let neighbours = getNeighbours(desert, currentPoint);
  // console.log("Neighbours: ", neighbours);

  for (let k = 0; k < neighbours.length; k++) {
    let [x, y] = neighbours[k];
    let key = `${x},${y}`;

    if (visited.has(key)) {
      continue;
    }

    // console.log(
    //   "Checking: ",
    //   [x, y],
    //   desert[x][y],
    //   isPossibleToMoveHere(desert, currentPoint, [x, y])
    // );

    if (isPossibleToMoveHere(desert, currentPoint, [x, y])) {
      visited.add(key);

      console.log("Moving from ", currentPoint, " to ", [x, y], desert[x][y]);
      nextPoint = [x, y];
      desert[currentPoint[0]][currentPoint[1]] = "X";
      break;
    }
  }

  return nextPoint;
}

function getNeighbours(desert, currentPoint) {
  let [i, j] = currentPoint;
  let neighbours = [];

  if (i - 1 >= 0) {
    neighbours.push([i - 1, j]);
  }
  if (i + 1 < desert.length) {
    neighbours.push([i + 1, j]);
  }
  if (j - 1 >= 0) {
    neighbours.push([i, j - 1]);
  }
  if (j + 1 < desert[0].length) {
    neighbours.push([i, j + 1]);
  }

  return neighbours;
}

function isPossibleToMoveHere(desert, currentPoint, nextPoint) {
  let [i, j] = currentPoint;
  let [x, y] = nextPoint;

  if (desert[x][y] === ".") {
    return false;
  }

  // Going to left
  if (i === x && j > y) {
    if (desert[x][y] === "L" || desert[x][y] === "-" || desert[x][y] === "F") {
      return true;
    }
  }

  // Going to right
  if (i === x && j < y) {
    if (desert[x][y] === "-" || desert[x][y] === "7" || desert[x][y] === "J") {
      return true;
    }
  }

  // Going to top
  if (y === j && i > x) {
    // console.log("Going to top");
    if (desert[x][y] === "|" || desert[x][y] === "7" || desert[x][y] === "F") {
      return true;
    }
  }

  // Going to bottom
  if (y === j && i < x) {
    if (desert[x][y] === "|" || desert[x][y] === "L" || desert[x][y] === "J") {
      return true;
    }
  }

  return false;
}

console.log(desert);
