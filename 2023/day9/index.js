import { syncReadFile } from "../utils.js";

let lines = syncReadFile("./sample.txt", "\n");
// sample.txt expects 114 as answer for part 1
// sample2.txt expects 2 as answer for part 2

// Parse the input
let ecoData = lines.map((line) => {
  let data = line
    .split(" ")
    .filter((item) => item !== "")
    .map((item) => parseInt(item));
  return data;
});

console.log(ecoData);

function part1(ecoData) {
  let sum = 0;
  for (let i = 0; i < ecoData.length; i++) {
    sum += getNextValue(ecoData[i]);
  }
  return sum;
}

function getNextValue(data) {
  let diffArrs = [data];

  while (!isAllNumsSame(diffArrs[diffArrs.length - 1])) {
    let newdiffArr = [];

    for (let i = 0; i < diffArrs[diffArrs.length - 1].length - 1; i++) {
      newdiffArr.push(
        diffArrs[diffArrs.length - 1][i + 1] - diffArrs[diffArrs.length - 1][i]
      );
    }

    diffArrs.push(newdiffArr);
  }

  // sum of all last elements of each array
  let sum = 0;

  for (let i = 0; i < diffArrs.length; i++) {
    sum += diffArrs[i][diffArrs[i].length - 1];
  }

  return sum;
}

function isAllNumsSame(arr) {
  let set = new Set(arr);
  return set.size === 1;
}

console.log("Part 1: ", part1(ecoData));

// Part 2

function part2(ecoData) {
  let sum = 0;
  for (let i = 0; i < ecoData.length; i++) {
    sum += getPreviousValue(ecoData[i]);
  }
  return sum;
}

function getPreviousValue(data) {
  let diffArrs = [data];

  while (!isAllNumsSame(diffArrs[diffArrs.length - 1])) {
    let newdiffArr = [];

    for (let i = 0; i < diffArrs[diffArrs.length - 1].length - 1; i++) {
      newdiffArr.push(
        diffArrs[diffArrs.length - 1][i + 1] - diffArrs[diffArrs.length - 1][i]
      );
    }

    diffArrs.push(newdiffArr);
  }

  let negativeSum = 0;

  for (let i = diffArrs.length - 1; i >= 0; i--) {
    console.log(diffArrs[i][0]);
    negativeSum = diffArrs[i][0] - negativeSum;
  }

  console.log("\n", negativeSum);

  return negativeSum;
}

console.log("Part 2: ", part2(ecoData));
