// run `node index.js` in the terminal
import { syncReadFile } from "../utils.js";

let arr = syncReadFile("./input.txt", "\n\n");

let sumArray = arr.map((str) => {
  let numArr = str.split("\n").map((str) => {
    return parseInt(str);
  });

  return numArr.reduce((acc, curr) => {
    return acc + curr;
  });
});

console.log("Maximum >>", Math.max(...sumArray));
console.log(
  "Top 3 sum>>",
  sumArray
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, curr) => acc + curr)
);
