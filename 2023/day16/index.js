import { syncReadFile } from "../utils.js";

let lines = syncReadFile(`./sample.txt`, "\n");
// sample.txt expects 46 as answer for part 1
// sample.txt expects 145 as answer for part 2

// Parse the input
let tiles = lines.map((line) => line.split(""));
let yMin = 0;
let xMin = 0;
let yMax = tiles.length - 1;
let xMax = tiles[0].length - 1;
console.log("total tiles", tiles.length * tiles[0].length);

function getPrimaryDir(tiles) {
  let entryTile = tiles[0][0];

  switch (entryTile) {
    case "/":
      return "up";
    case "\\":
      return "down";
    default:
      return "right";
  }
}

let uniques = new Set();

function getCountOfEnergizedTiles() {
  let ray = { pos: [0, 0], dir: getPrimaryDir(tiles) };
  let visited = new Set();

  move(ray, visited);

  return uniques.size;
}

function move(currentRay, visited) {
  let key = getKey(currentRay);
  if (visited.has(key)) {
    return;
  }

  visited.add(key);
  // console.log(visited.size);
  uniques.add(`${currentRay.pos[0]},${currentRay.pos[1]}`);
  switch (currentRay.dir) {
    case "right":
      moveRight(currentRay, visited);
      break;
    case "left":
      moveLeft(currentRay, visited);
      break;
    case "up":
      moveUp(currentRay, visited);
      break;
    case "down":
      moveDown(currentRay, visited);
      break;
  }
}

function moveRight(currentRay, visited) {
  let [y, x] = currentRay.pos;
  let newPos = [y, x + 1];
  let isInBounds = x + 1 <= xMax;

  if (!isInBounds) {
    return;
  }

  let tile = tiles[y][x + 1];

  switch (tile) {
    case ".":
      while (
        isInBounds &&
        tile === "." &&
        !visited.has(getKey({ pos: newPos, dir: "right" }))
      ) {
        x++;
        tile = tiles[y][x];
        newPos = [y, x];
        visited.add(getKey({ pos: newPos, dir: "right" }));
        uniques.add(`${y},${x}`);
        isInBounds = x + 1 <= xMax;
      }
      move({ pos: newPos, dir: "right" }, visited);
      break;
    case "-":
      move({ pos: newPos, dir: "right" }, visited);
      break;
    case "/":
      move({ pos: newPos, dir: "up" }, visited);
      break;
    case "\\":
      move({ pos: newPos, dir: "down" }, visited);
      break;
    case "|":
      move({ pos: newPos, dir: "up" }, visited);
      move({ pos: newPos, dir: "down" }, visited);
      break;
  }
}

function moveLeft(currentRay, visited) {
  let [y, x] = currentRay.pos;
  let newPos = [y, x - 1];
  let isInBounds = x - 1 >= xMin;

  if (!isInBounds) {
    return;
  }

  let tile = tiles[y][x - 1];

  switch (tile) {
    case ".":
      while (
        isInBounds &&
        tile === "." &&
        !visited.has(getKey({ pos: newPos, dir: "left" }))
      ) {
        x--;
        tile = tiles[y][x];
        newPos = [y, x];
        visited.add(getKey({ pos: newPos, dir: "left" }));
        uniques.add(`${y},${x}`);
        isInBounds = x - 1 >= xMin;
      }
      move({ pos: newPos, dir: "left" }, visited);
      break;
    case "-":
      move({ pos: newPos, dir: "left" }, visited);
      break;
    case "/":
      move({ pos: newPos, dir: "down" }, visited);
      break;
    case "\\":
      move({ pos: newPos, dir: "up" }, visited);
      break;
    case "|":
      move({ pos: newPos, dir: "up" }, visited);
      move({ pos: newPos, dir: "down" }, visited);
      break;
  }
}

function moveUp(currentRay, visited) {
  let [y, x] = currentRay.pos;
  let newPos = [y - 1, x];
  let isInBounds = y - 1 >= yMin;

  if (!isInBounds) {
    return;
  }
  let tile = tiles[y - 1][x];

  switch (tile) {
    case ".":
      while (
        isInBounds &&
        tile === "." &&
        !visited.has({ pos: newPos, dir: "up" })
      ) {
        y--;
        tile = tiles[y][x];
        newPos = [y, x];
        visited.add(getKey({ pos: newPos, dir: "up" }));
        uniques.add(`${y},${x}`);
        isInBounds = y - 1 >= yMin;
      }
      move({ pos: newPos, dir: "up" }, visited);
      break;
    case "-":
      move({ pos: newPos, dir: "right" }, visited);
      move({ pos: newPos, dir: "left" }, visited);

      break;
    case "/":
      move({ pos: newPos, dir: "right" }, visited);
      break;
    case "\\":
      move({ pos: newPos, dir: "left" }, visited);
      break;
    case "|":
      move({ pos: newPos, dir: "up" }, visited);
      break;
  }
}

function moveDown(currentRay, visited) {
  let [y, x] = currentRay.pos;
  let newPos = [y + 1, x];
  let isInBounds = y + 1 <= yMax;

  if (!isInBounds) {
    return;
  }

  let tile = tiles[y + 1][x];

  switch (tile) {
    case ".":
      while (
        isInBounds &&
        tile === "." &&
        !visited.has(getKey({ pos: newPos, dir: "down" }))
      ) {
        y++;
        tile = tiles[y][x];
        newPos = [y, x];
        isInBounds = y + 1 <= yMax;
      }
      move({ pos: newPos, dir: "down" }, visited);
      break;
    case "-":
      move({ pos: newPos, dir: "left" }, visited);
      move({ pos: newPos, dir: "right" }, visited);
      break;
    case "/":
      move({ pos: newPos, dir: "left" }, visited);
      break;
    case "\\":
      move({ pos: newPos, dir: "right" }, visited);
      break;
    case "|":
      move({ pos: newPos, dir: "down" }, visited);
      break;
  }
}

console.log("Part 1", getCountOfEnergizedTiles());

// Helper functions
function getKey({ pos: [x, y], dir }) {
  return `${x},${y}, ${dir}`;
}
