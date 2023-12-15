import { syncReadFile } from "../utils.js";

let lines = syncReadFile("./input.txt", ",");
// sample.txt expects 1320 as answer for part 1
// sample2.txt expects 145 as answer for part 2

// Parse the input
console.log(lines);
let sum = 0;

lines.forEach((str) => {
  sum += getHashOfAString(str);
});

console.log("Part 1", sum);

// Part 2
let boxMap = new Map();
lines.forEach((str) => {
  let lensType = str.match(/[a-z]+/)[0];
  let hash = getHashOfAString(lensType);
  let operation = str.match(/[-=]/)[0];
  let focalLength = str.match(/\d+/) ? str.match(/\d+/)[0] : 0;
  if (!boxMap.has(hash)) {
    boxMap.set(hash, []);
  }

  let box = boxMap.get(hash);

  if (operation === "=") {
    let index = box.findIndex((x) => x[0] === lensType);
    if (index > -1) {
      box[index][1] = focalLength;
    } else {
      box.push([lensType, focalLength]);
    }
  } else {
    let index = box.findIndex((x) => x[0] === lensType);
    if (index > -1) {
      box.splice(index, 1);
    }
  }
});

console.log(boxMap);
let part2Sum = 0;

boxMap.forEach((box, key) => {
  let boxNum = parseInt(key) + 1;
  let localSum = 0;
  box.forEach((lens, i) => {
    let [_, focalLength] = lens;
    localSum += parseInt(focalLength) * (i + 1);
  });

  part2Sum += localSum * boxNum;
});

console.log("Part 2", part2Sum);

// Helper functions

function getHashOfAString(str) {
  let currentHash = 0;

  str.split("").forEach((letter) => {
    currentHash += getAsciiOfALetter(letter);
    currentHash *= 17;
    currentHash %= 256;
  });

  return currentHash;
}

function getAsciiOfALetter(letter) {
  return letter.charCodeAt(0);
}
