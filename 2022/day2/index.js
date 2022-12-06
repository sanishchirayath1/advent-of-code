import { syncReadFile } from "../utils.js";

let arr = syncReadFile("./input.txt");
let len = arr.length;
let totalPoints = 0;
let part2points = 0;

for (let i = 0; i < len; i++) {
  totalPoints += getPoints(arr[i]);
  part2points += getPart2points(arr[i]);
}

function getPoints(str) {
  let strArr = str.split(" ");
  let opponent = strArr[0];
  let you = strArr[1];
  let score = 0;

  switch (you) {
    case "X":
      if (opponent === "A") score = 3;
      else if (opponent === "B") score = 0;
      else score = 6;
      return 1 + score;
    case "Y":
      if (opponent === "A") score = 6;
      else if (opponent === "B") score = 3;
      else score = 0;
      return 2 + score;
    case "Z":
      if (opponent === "A") score = 0;
      else if (opponent === "B") score = 6;
      else score = 3;
      return 3 + score;
  }
}

function getPart2points(str) {
  let strArr = str.split(" ");
  let opponent = strArr[0];
  let you = strArr[1];
  let score = 0;

  switch (you) {
    case "X":
      if (opponent === "A") score = 3;
      else if (opponent === "B") score = 1;
      else score = 2;
      return 0 + score;
    case "Y":
      if (opponent === "A") score = 1;
      else if (opponent === "B") score = 2;
      else score = 3;
      return 3 + score;
    case "Z":
      if (opponent === "A") score = 2;
      else if (opponent === "B") score = 3;
      else score = 1;
      return 6 + score;
  }
}

console.log(totalPoints);
console.log(part2points);
