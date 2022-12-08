import { syncReadFile } from "../utils.js";

let arr = syncReadFile("./input.txt");
// sample.txt expects 21 as answer for part 1
// sample.txt expects 8 as answer for part 2

arr = arr.map((item) => {
  return item.split("");
});

let height = arr.length;
let width = arr[0].length;
let visibleTreeCount = 0;
let highestScenicScore = 0;

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (isTreeVisible(x, y, arr)) {
      visibleTreeCount++;
    }
  }
}

console.log("Part 1 >> ", visibleTreeCount);
console.log("Part 2 >> ", highestScenicScore);

function isTreeVisible(x, y, array) {
  if (isEdge(x, y)) {
    return true;
  } else {
    let left = scanLeft(x, y, array);
    let right = scanRight(x, y, array);
    let up = scanUp(x, y, array);
    let down = scanDown(x, y, array);

    let score = left.count * right.count * up.count * down.count;

    highestScenicScore = Math.max(highestScenicScore, score);

    return left.bool || right.bool || up.bool || down.bool;
  }
}

function isEdge(x, y) {
  if (x === width - 1 || y === height - 1 || x === 0 || y === 0) {
    return true;
  }
  return false;
}

function scanLeft(x, y, array) {
  let bool = true;
  let count = 0;

  for (let i = x - 1; i >= 0; i--) {
    count++;
    if (array[y][i] >= array[y][x]) {
      bool = false;
      break;
    }
  }

  return { bool, count };
}

function scanRight(x, y, array) {
  let bool = true;
  let count = 0;

  for (let i = x + 1; i < width; i++) {
    count++;
    if (array[y][i] >= array[y][x]) {
      bool = false;
      break;
    }
  }

  return { bool, count };
}

function scanUp(x, y, array) {
  let bool = true;
  let count = 0;

  for (let i = y - 1; i >= 0; i--) {
    count++;
    if (array[i][x] >= array[y][x]) {
      bool = false;
      break;
    }
  }

  return { bool, count };
}

function scanDown(x, y, array) {
  let bool = true;
  let count = 0;

  for (let i = y + 1; i < height; i++) {
    count++;
    if (array[i][x] >= array[y][x]) {
      bool = false;
      break;
    }
  }

  return { bool, count };
}
