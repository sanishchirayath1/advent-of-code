import { syncReadFile } from "../utils.js";

// function syncReadFile(filename) {
//   const contents = readFileSync(filename, "utf-8");

//   return contents;
// }

let str = syncReadFile("./input.txt", " ");

let uniqueElementCount = 14;
let firstMarkerAt = uniqueElementCount - 1;

for (let i = firstMarkerAt; i < str.length; i++) {
  let array = [];
  for (let j = i - firstMarkerAt; j <= i; j++) {
    array.push(str[j]);
  }

  if (uniqueElementArray(array)) {
    firstMarkerAt = i;
    break;
  }
}

function uniqueElementArray(array) {
  const set = new Set(array);

  let arrayLen = array.length;
  let newArr = [...set];
  let newArrayLen = newArr.length;

  return arrayLen === newArrayLen;
}

console.log(firstMarkerAt + 1);
