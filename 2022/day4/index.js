import { syncReadFile } from "../utils.js";

let arr = syncReadFile("./input.txt");
let len = arr.length;

console.log(arr);
// part 1
let fullyContainCount = 0;

for (let i = 0; i < len; i++) {
  let ranges = arr[i].split(",");

  let firstElvRange = ranges[0].split("-").map((x) => parseInt(x));
  let secondElvRange = ranges[1].split("-").map((x) => parseInt(x));

  let firstElvContainsSecond =
    firstElvRange[0] <= secondElvRange[0] &&
    firstElvRange[1] >= secondElvRange[1];
  let secondElvContainsFirst =
    firstElvRange[0] >= secondElvRange[0] &&
    firstElvRange[1] <= secondElvRange[1];

  if (firstElvContainsSecond || secondElvContainsFirst) {
    fullyContainCount++;
  }
}

console.log("fullyContainCount >>", fullyContainCount);

// part 2

let overlapCount = 0;

for (let i = 0; i < len; i++) {
  let ranges = arr[i].split(",");

  let firstElvRange = ranges[0].split("-").map((x) => parseInt(x));
  let secondElvRange = ranges[1].split("-").map((x) => parseInt(x));

  let isNotOverlapping =
    secondElvRange[0] > firstElvRange[1] ||
    firstElvRange[0] > secondElvRange[1];

  if (!isNotOverlapping) {
    overlapCount++;
  }
}

console.log("overlapCount >>", overlapCount);
