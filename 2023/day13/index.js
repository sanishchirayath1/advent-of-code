import { syncReadFile } from "../utils.js";

let mirrors = syncReadFile("./input.txt", "\n\n");
// sample.txt expects 405 as answer for part 1
// sample2.txt expects 2 as answer for part 2

// Parse the input
mirrors = mirrors.map((x) => x.split("\n").map((y) => y.split("")));
console.log(mirrors);

function getSum(fixSmudge = false) {
  let sum = 0;
  for (let i = 0; i < mirrors.length; i++) {
    let mirror = mirrors[i];
    let axisOfSymmetry = getAxisOfSymmetry(mirror, fixSmudge);

    if (axisOfSymmetry >= 0) {
      sum += (axisOfSymmetry + 1) * 100;
    } else {
      let transposed = getTransposedMatrix(mirror);
      axisOfSymmetry = getAxisOfSymmetry(transposed, fixSmudge);
      if (axisOfSymmetry >= 0) {
        sum += axisOfSymmetry + 1;
      }
    }
  }

  return sum;
}

console.log("Part 1: ", getSum());
console.log("Part 2: ", getSum(true));

function getAxisOfSymmetry(mirror, fixSmudge = false) {
  let len = mirror.length;

  for (let i = 0; i < len - 1; i++) {
    if (isReflection(mirror, i, fixSmudge)) {
      return i;
    }
  }

  return -1;
}

function opposite(char) {
  return char === "#" ? "." : "#";
}

function isReflection(mirror, axis, fixSmudge = false) {
  let minlen = Math.min(axis + 1, mirror.length - axis - 1);
  let mismatchAllowed = fixSmudge ? 1 : 0;

  for (let i = 0; i < minlen; i++) {
    let row1Idx = axis - i;
    let row2Idx = axis + i + 1;
    let row1 = mirror[row1Idx];
    let row2 = mirror[row2Idx];

    let [isSame, mismatches, misMatchIndices] = isSameArray(row1, row2);

    if (fixSmudge) {
      if (mismatches === 1) {
        let colIdx = misMatchIndices[0];
        let tempMirror = deepCopy(mirror);
        tempMirror[row1Idx][colIdx] = opposite(row1[colIdx]);
        if (isReflection(tempMirror, axis, false)) {
          return true;
        }
      }
    }

    if (!isSame) {
      return false;
    }
  }

  return !fixSmudge;
}

function deepCopy(arr) {
  return JSON.parse(JSON.stringify(arr));
}

function isSameArray(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  let mismatches = 0;
  let misMatchIndices = [];

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      mismatches++;
      misMatchIndices.push(i);
    }
  }

  return [mismatches < 1, mismatches, misMatchIndices];
}

function getTransposedMatrix(matrix) {
  let transposed = [];

  for (let i = 0; i < matrix[0].length; i++) {
    transposed.push(matrix.map((x) => x[i]));
  }

  return transposed;
}
