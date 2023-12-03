import { syncReadFile } from "../utils.js";

let arr = syncReadFile("./input.txt", "\n");
// sample.txt expects 4361 as answer for part 1
// sample2.txt expects 467835 as answer for part 2

console.log("arr : ", arr);

let twoDArr = arr.map((row) => row.split(""));
console.log(twoDArr);

// part 1
let [numbers, coords] = getValidNumbersAndCoords(twoDArr);
console.log(numbers);
console.log(coords);

let sum = 0;
for (let i = 0; i < numbers.length; i++) {
  if (hasSymbolAsNeighbor(twoDArr, coords[i])) {
    sum += numbers[i];
  }
}

console.log("Part 1", sum);

// part 2
let [numbers2, coords2] = getValidNumbersAndCoords(twoDArr);

let validGears = [];
let validGearCoords = [];
let starCoords = [];

for (let i = 0; i < numbers2.length; i++) {
  let [hasStar, starCoord] = hasStarAsNeighbor(twoDArr, coords2[i]);
  if (hasStar) {
    validGears.push(numbers2[i]);
    starCoords.push(starCoord);
    validGearCoords.push(coords2[i]);
  }
}

console.log(validGears);
console.log(validGearCoords);
console.log(starCoords);

let gearSum = 0;

for (let i = 0; i < validGears.length; i++) {
  let firstGear = validGears[i];
  let firstGearStarCoord = starCoords[i];
  let secondGear = 0;
  let start = 1;

  while (i + start < validGears.length) {
    let currentGear = validGears[i + start];
    let currentGearStarCoord = starCoords[i + start];

    if (currentGearStarCoord[0] !== firstGearStarCoord[0]) {
      start++;
      continue;
    }

    if (currentGearStarCoord[1] !== firstGearStarCoord[1]) {
      start++;
      continue;
    }

    secondGear = currentGear;
    break;
  }

  gearSum += firstGear * secondGear;
}

console.log("Part 2", gearSum);

// Helper functions
function hasStarAsNeighbor(arr, [row, colStart, colEnd]) {
  let hasStar = false;
  let starCoord = [];
  // we need to check if there is a star in any of the surrounding cells inclusive of diagonals
  // check if there is a star in the row above
  if (row - 1 >= 0) {
    for (let i = colStart; i <= colEnd; i++) {
      if (isStarSymbol(arr[row - 1][i])) {
        hasStar = true;
        starCoord = [row - 1, i];
        break;
      }
    }
  }
  // check if there is a star in the row below
  if (row + 1 < arr.length) {
    for (let i = colStart; i <= colEnd; i++) {
      if (isStarSymbol(arr[row + 1][i])) {
        hasStar = true;
        starCoord = [row + 1, i];
        break;
      }
    }
  }
  // check if there is a star in the same row
  if (colStart - 1 >= 0) {
    if (isStarSymbol(arr[row][colStart - 1])) {
      hasStar = true;
      starCoord = [row, colStart - 1];
      return [hasStar, starCoord];
    }
  }
  if (colEnd + 1 < arr[row].length) {
    if (isStarSymbol(arr[row][colEnd + 1])) {
      hasStar = true;
      starCoord = [row, colEnd + 1];
      return [hasStar, starCoord];
    }
  }
  // check if there is a star in the diagonal above
  if (row - 1 >= 0 && colStart - 1 >= 0) {
    if (isStarSymbol(arr[row - 1][colStart - 1])) {
      hasStar = true;
      starCoord = [row - 1, colStart - 1];
      return [hasStar, starCoord];
    }
  }
  if (row - 1 >= 0 && colEnd + 1 < arr[row].length) {
    if (isStarSymbol(arr[row - 1][colEnd + 1])) {
      hasStar = true;
      starCoord = [row - 1, colEnd + 1];
      return [hasStar, starCoord];
    }
  }
  // check if there is a star in the diagonal below
  if (row + 1 < arr.length && colStart - 1 >= 0) {
    if (isStarSymbol(arr[row + 1][colStart - 1])) {
      hasStar = true;
      starCoord = [row + 1, colStart - 1];
      return [hasStar, starCoord];
    }
  }
  if (row + 1 < arr.length && colEnd + 1 < arr[row].length) {
    if (isStarSymbol(arr[row + 1][colEnd + 1])) {
      hasStar = true;
      starCoord = [row + 1, colEnd + 1];
    }
  }
  return [hasStar, starCoord];
}

function hasSymbolAsNeighbor(arr, [row, colStart, colEnd]) {
  let hasSymbol = false;
  // we need to check if there is a symbol in any of the surrounding cells inclusive of diagonals
  // check if there is a symbol in the row above
  if (row - 1 >= 0) {
    for (let i = colStart; i <= colEnd; i++) {
      if (isSymbol(arr[row - 1][i])) {
        hasSymbol = true;
        break;
      }
    }
  }
  // check if there is a symbol in the row below
  if (row + 1 < arr.length) {
    for (let i = colStart; i <= colEnd; i++) {
      if (isSymbol(arr[row + 1][i])) {
        hasSymbol = true;
        break;
      }
    }
  }
  // check if there is a symbol in the same row
  if (colStart - 1 >= 0) {
    if (isSymbol(arr[row][colStart - 1])) {
      hasSymbol = true;
    }
  }
  if (colEnd + 1 < arr[row].length) {
    if (isSymbol(arr[row][colEnd + 1])) {
      hasSymbol = true;
    }
  }
  // check if there is a symbol in the diagonal above
  if (row - 1 >= 0 && colStart - 1 >= 0) {
    if (isSymbol(arr[row - 1][colStart - 1])) {
      hasSymbol = true;
    }
  }
  if (row - 1 >= 0 && colEnd + 1 < arr[row].length) {
    if (isSymbol(arr[row - 1][colEnd + 1])) {
      hasSymbol = true;
    }
  }
  // check if there is a symbol in the diagonal below
  if (row + 1 < arr.length && colStart - 1 >= 0) {
    if (isSymbol(arr[row + 1][colStart - 1])) {
      hasSymbol = true;
    }
  }
  if (row + 1 < arr.length && colEnd + 1 < arr[row].length) {
    if (isSymbol(arr[row + 1][colEnd + 1])) {
      hasSymbol = true;
    }
  }
  return hasSymbol;
}

function isStarSymbol(char) {
  return char === "*";
}

function isSymbol(char) {
  return char !== "." || !isNaN(parseInt(char));
}

function getValidNumbersAndCoords(arr) {
  // valid number is something that has a symbol as a neighbor even diagonally, ex ($, #, @, ! etc)
  // if yoou see a numbers adjacent to each other in the same row then it should be considered as a single number 1,2,3 => 123
  let allNumbers = [];
  let numberCoordinates = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (isNaN(arr[i][j])) {
        continue;
      }

      let number = "";
      number += arr[i][j];
      let start = j;
      while (j + 1 < arr[i].length && !isNaN(arr[i][j + 1])) {
        number += arr[i][j + 1];
        j++;
      }

      allNumbers.push(parseInt(number));
      numberCoordinates.push([i, start, j]);
    }
  }
  return [allNumbers, numberCoordinates];
}
