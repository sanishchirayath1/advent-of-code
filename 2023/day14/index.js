import { syncReadFile } from "../utils.js";

let lines = syncReadFile("./input.txt", "\n");
// sample.txt expects 136 as answer for part 1
// sample2.txt expects 64 as answer for part 2

// Parse the input
let reflectorDish = lines.map((x) => x.split(""));

// Tilting East
function getTotalLoad(reflector) {
  let totalLoad = 0;
  let rockData = [];

  // console.log(rockData);

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

  // console.log(rockData);

  let maxLoad = reflector[0].length;
  // find the totoal load
  for (let i = 0; i < rockData.length; i++) {
    let row = rockData[i];
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
console.log("Part 1 - East: ", getTotalLoad(reflectorDish));

let rotated = rotateMatrix(reflectorDish);
console.log("Part 1 - South: ", getTotalLoad(rotated));

rotated = rotateMatrix(rotated);
console.log("Part 1 - West: ", getTotalLoad(rotated));

rotated = rotateMatrix(rotated);
console.log("Part 1 - North: ", getTotalLoad(rotated));

let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

let expected = [
  [7, 4, 1],
  [8, 5, 2],
  [9, 6, 3],
];

console.log(rotateMatrix(matrix));

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
