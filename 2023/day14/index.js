import { syncReadFile } from "../utils.js";

let lines = syncReadFile("./sample.txt", "\n");
// sample.txt expects 136 as answer for part 1
// sample2.txt expects 64 as answer for part 2

// Parse the input
let reflectorDish = lines.map((x) => x.split(""));

let count = 3;

while (count > 0) {
  reflectorDish = rotateMatrix(reflectorDish);
  count--;
}

let rockData = getRockData(reflectorDish);

// get the total load
function getTotalLoad(reflector, rockInfo) {
  let totalLoad = 0;

  let maxLoad = reflector[0].length;
  // find the totoal load
  for (let i = 0; i < rockInfo.length; i++) {
    let row = rockInfo[i];
    let rowload = 0;
    for (let j = 0; j < row.length; j++) {
      let [start, rocks] = row[j];
      let stackRank = 0;

      while (rocks > 0) {
        rowload += maxLoad - start - stackRank;
        rocks--;
        stackRank++;
      }
    }
    totalLoad += rowload;
  }

  return totalLoad;
}

console.log("Part 1: ", getTotalLoad(reflectorDish, rockData));

// Part 2
let hashSet = new Set();
let hashMap = new Map();
function getCountOfCyclesBeforeRepetition(reflector) {
  let count = 1;
  let hash;

  while (!hashSet.has(hash)) {
    let rockData = getRockData(reflector);
    let tiltsPerCycle = 4;
    while (tiltsPerCycle > 0) {
      let tilted = tiltedMatrix(reflector, rockData);
      let rotated = rotateMatrix(tilted);
      rockData = getRockData(rotated);
      reflector = rotated;
      tiltsPerCycle--;
    }
    hash = JSON.stringify(rockData);
    hashSet.add(hash);
    let load = getTotalLoad(reflector, rockData);
    hashMap.set(String(count), load);
    count++;
  }
  console.log(hashSet);
  console.log(hashMap);

  return count;
}

let cyclesToRan = 1000000000 % getCountOfCyclesBeforeRepetition(reflectorDish);

console.log(cyclesToRan);

console.log("Part 2: ", hashMap.get(String(cyclesToRan)));

function tiltedMatrix(reflector, rockData) {
  let tilted = Array(reflector.length)
    .fill()
    .map(() => Array(reflector[0].length).fill("."));
  // Create a new matrix
  for (let i = 0; i < rockData.length; i++) {
    let row = rockData[i];

    for (let j = 0; j < row.length; j++) {
      let [start, rocks] = row[j];
      let stackRank = 0;
      if (start > 0) {
        tilted[i][start - 1] = "#";
        while (rocks > 0) {
          tilted[i][start + stackRank] = "O";
          rocks--;
          stackRank++;
        }
      } else {
        while (rocks > 0) {
          tilted[i][start + stackRank] = "O";
          rocks--;
          stackRank++;
        }
      }
    }
  }
  console.log(tilted);
  return tilted;
}

function rotateMatrix(matrix) {
  let rotated = [];
  for (let i = 0; i < matrix.length; i++) {
    rotated.push([]);
    for (let j = 0; j < matrix[i].length; j++) {
      rotated[i][j] = matrix[matrix.length - j - 1][i];
    }
  }

  return rotated;
}

function getRockData(reflector) {
  let rockData = [];

  for (let i = 0; i < reflector.length; i++) {
    let data = [[0, 0]];
    let row = reflector[i];
    for (let j = 0; j < row.length; j++) {
      let rock = row[j];
      if (rock === "#") {
        data.push([j + 1, 0]);
      } else if (rock === "O") {
        let last = data.length - 1;
        data[last][1]++;
      }
    }

    rockData.push(data);
  }
  return rockData;
}
