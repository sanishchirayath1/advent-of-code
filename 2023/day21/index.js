import { syncReadFile } from "../utils.js";

let lines = syncReadFile(`./input.txt`, "\n");
// sample.txt expects 16 as answer for part 1
// sample.txt expects 167409079868000 as answer for part 2

// Parse the input
let tiles = lines.map((line) => {
  return line.split("");
});

console.log(tiles);

// Starting Point "S"
// Find the starting point
for (let y = 0; y < tiles.length; y++) {
  for (let x = 0; x < tiles[y].length; x++) {
    if (tiles[y][x] === "S") {
      var startingPoint = [y, x];
      break;
    }
  }
}

console.log(startingPoint);

function exploreTiles(
  start,
  tiles,
  steps,
  endPoints = new Set(),
  visited = new Set()
) {
  let [y, x] = start;
  let tile = tiles[y][x];
  let key = getKey(y, x, steps);

  if (tile === "#") {
    return;
  }

  if (visited.has(key)) {
    return;
  }

  visited.add(key);

  if (steps === 0) {
    if (!endPoints.has(key)) {
      endPoints.add(key);
    }
    return;
  }

  if (x > 0) {
    // Check left
    exploreTiles([y, x - 1], tiles, steps - 1, endPoints, visited);
  }
  if (x < tiles[y].length - 1) {
    // Check right
    exploreTiles([y, x + 1], tiles, steps - 1, endPoints, visited);
  }

  if (y > 0) {
    // Check up
    exploreTiles([y - 1, x], tiles, steps - 1, endPoints, visited);
  }

  if (y < tiles.length - 1) {
    // Check down
    exploreTiles([y + 1, x], tiles, steps - 1, endPoints, visited);
  }

  return endPoints.size;
}

let maxSteps = 64;
console.log("Part 1", exploreTiles(startingPoint, tiles, maxSteps));
// console.log(tiles);

function getKey(y, x, steps) {
  return `${y},${x},${steps}`;
}
