import { syncReadFile } from "../utils.js";

let arr = syncReadFile("./input.txt", "\n");
// sample.txt expects 142 as answer for part 1
// sample2.txt expects 281 as answer for part 2

console.log("arr : ", arr);

// Part 1
let len = arr.length;
let sum = 0;

for (let i = 0; i < len; i++) {
  let firstDigit = "";
  let secondDigit = "";
  let arrToScan = arr[i].split("");

  for (let j = 0; j < arrToScan.length; j++) {
    let isNum = Number.isInteger(parseInt(arrToScan[j]));
    if (isNum) {
      if (firstDigit === "") {
        firstDigit = arrToScan[j];
        secondDigit = arrToScan[j];
      } else {
        secondDigit = arrToScan[j];
      }
    }
  }

  let num = parseInt(firstDigit + secondDigit);
  sum += num;
}

console.log("Part1 : ", sum);

// Part 2
const numberMap = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

function sumNumbers(lines) {
  let totalSum = 0;

  for (let line of lines) {
    let currentNumber = "";
    for (let i = 0; i < line.length; i++) {
      if (!isNaN(line[i])) {
        currentNumber += line[i];
      } else {
        for (let number in numberMap) {
          if (line.substr(i, number.length) === number) {
            currentNumber += numberMap[number];
            break;
          }
        }
      }
    }
    totalSum += parseInt(
      currentNumber[0] + currentNumber[currentNumber.length - 1]
    );
  }

  return totalSum;
}

console.log("part2", sumNumbers(arr)); // Outputs: 281
