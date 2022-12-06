import { syncReadFile } from "../utils.js";

let arr = syncReadFile("./input.txt");
let len = arr.length;
let commonsArray = [];

for (let i = 0; i < len; i++) {
  findCommonEl(arr[i]);
}

function findCommonEl(str) {
  let length = str.length;
  let mid = length / 2;
  let dict = {};

  for (let i = 0; i < length; i++) {
    if (i < mid) {
      dict[str[i]] = true;
    }

    if (i >= mid && dict[str[i]]) {
      commonsArray.push(str[i]);
      break;
    }
  }
}

// console.log(commonsArray);

function charcodesum(array) {
  let sum = 0;

  for (let i = 0; i < array.length; i++) {
    let code = array[i].charCodeAt(0);
    if (code < 91) {
      sum += code - 64 + 26;
    } else {
      sum += code - 96;
    }
  }

  return sum;
}

let sum = charcodesum(commonsArray);

console.log("part 1 sum >>", sum);

// part two
let badgeArr = [];
let ran = 0;

for (let i = 2; i < len; i = i + 3) {
  let first = arr[i];
  let second = arr[i - 1];
  let third = arr[i - 2];

  let biggestStrArr = [first, second, third].sort(
    (a, b) => a.length - b.length
  );

  for (let j = 0; j < biggestStrArr[0].length; j++) {
    let letter = biggestStrArr[0][j];
    let secondIndex = biggestStrArr[1].indexOf(letter);
    let thirdIndex = biggestStrArr[2].indexOf(letter);

    if (secondIndex > -1 && thirdIndex > -1) {
      badgeArr.push(letter);
      break;
    }
  }
}

console.log("part 2 sum >>", charcodesum(badgeArr));
