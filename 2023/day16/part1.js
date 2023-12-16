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
let uniques = new Set();

function getEnergizedTilesCount() {
  let start = {
    pos: [0, 0],
    dir: "right",
  };

  let visited = new Set();

  move(start, visited);

  return uniques.size;
}

console.log("Part 1", getEnergizedTilesCount());

function IsInBounds(ray) {
  let [y, x] = ray.pos;
  return y >= yMin && y <= yMax && x >= xMin && x <= xMax;
}

function move(ray, visited) {
  if (!IsInBounds(ray)) {
    return;
  }

  let key = getKey(ray);
  if (visited.has(key)) {
    return;
  }

  visited.add(key);
  uniques.add(`${ray.pos[0]},${ray.pos[1]}`);

  let current = tiles[ray.pos[0]][ray.pos[1]];
  let nextDirs = getNextDir(ray, current);

  switch (ray.dir) {
    case "right":
      nextDirs.forEach((dir) => {
        move(
          {
            pos: [ray.pos[0], ray.pos[1] + 1],
            dir: dir,
          },
          visited
        );
      });
    case "left":
      nextDirs.forEach((dir) => {
        move(
          {
            pos: [ray.pos[0], ray.pos[1] - 1],
            dir: dir,
          },
          visited
        );
      });
    case "up":
      nextDirs.forEach((dir) => {
        move(
          {
            pos: [ray.pos[0] - 1, ray.pos[1]],
            dir: dir,
          },
          visited
        );
      });
    case "down":
      nextDirs.forEach((dir) => {
        move(
          {
            pos: [ray.pos[0] + 1, ray.pos[1]],
            dir: dir,
          },
          visited
        );
      });
      break;
  }
}

function getKey(ray) {
  return JSON.stringify(ray);
}

function getNextDir(ray, current) {
  let rayDir = ray.dir;
  switch (rayDir) {
    case "right":
      if (current === "-") {
        return ["right"];
      } else if (current === "/") {
        return ["up"];
      } else if (current === "\\") {
        return ["down"];
      } else if (current === "|") {
        return ["up", "down"];
      }
      return ["right"];

    case "left":
      if (current === "-") {
        return ["left"];
      } else if (current === "/") {
        return ["down"];
      } else if (current === "\\") {
        return ["up"];
      } else if (current === "|") {
        return ["up", "down"];
      }
      return ["left"];
    case "up":
      if (current === "|") {
        return ["up"];
      } else if (current === "/") {
        return ["right"];
      } else if (current === "\\") {
        return ["left"];
      } else if (current === "-") {
        return ["left", "right"];
      }
      return ["up"];

    case "down":
      if (current === "|") {
        return ["down"];
      } else if (current === "/") {
        return ["left"];
      } else if (current === "\\") {
        return ["right"];
      } else if (current === "-") {
        return ["left", "right"];
      }
      return ["down"];
  }
}
