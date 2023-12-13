import { syncReadFile } from "../utils.js";

let mirrors = syncReadFile("./input.txt", "\n\n");
// sample.txt expects 405 as answer for part 1
// sample2.txt expects 2 as answer for part 2

// Parse the input
mirrors = mirrors.map((x) => x.split("\n").map((y) => y.split("")));
console.log(mirrors);

function part1() {
  let sum = 0;
  for (let i = 0; i < mirrors.length; i++) {
    let [isVertical, colsToLeft] = scanForVerticalLine(mirrors[i]);

    if (isVertical) {
      sum += colsToLeft;
      continue;
    }

    let [isHorizontal, rowsAbove] = scanForHorizontalLine(mirrors[i]);

    sum += rowsAbove * 100;
  }

  return sum;
}

console.log("Part 1: ", part1());

function scanForVerticalLine(mirror) {
  let len = mirror[0].length;
  let pointer = 0;
  let left;
  let right;

  while (pointer < len - 1) {
    let col1 = mirror.map((x) => x[pointer]).join("");
    let col2 = mirror.map((x) => x[pointer + 1]).join("");

    if (col1 === col2) {
      left = pointer;
      right = pointer + 1;
      break;
    }

    pointer++;
  }

  // Expand from the middle to see if its a valid mirror
  let isVertical = true;

  while (left >= 0 && right < len) {
    let leftCol = mirror.map((x) => x[left]).join("");
    let rightCol = mirror.map((x) => x[right]).join("");

    if (leftCol !== rightCol) {
      isVertical = false;
      break;
    }

    left--;
    right++;
  }

  return [isVertical, pointer + 1];
}

function scanForHorizontalLine(mirror) {
  let len = mirror.length;
  let pointer = 0;
  let top;
  let bottom;

  while (pointer < len - 1) {
    let row1 = mirror[pointer].join("");
    let row2 = mirror[pointer + 1].join("");

    if (row1 === row2) {
      top = pointer;
      bottom = pointer + 1;
      break;
    }

    pointer++;
  }

  // Expand from the middle to see if its a valid mirror
  let isHorizontal = true;

  while (top >= 0 && bottom < len) {
    let topRow = mirror[top].join("");
    let bottomRow = mirror[bottom].join("");

    if (topRow !== bottomRow) {
      isHorizontal = false;
      break;
    }

    top--;
    bottom++;
  }

  return [isHorizontal, pointer + 1];
}
