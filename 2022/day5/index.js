import { syncReadFile } from "../utils.js";

let stacks1 = [
  ["W", "M", "L", "F"],
  ["B", "Z", "V", "M", "F"],
  ["H", "V", "R", "S", "L", "Q"],
  ["F", "S", "V", "Q", "P", "M", "T", "J"],
  ["L", "S", "W"],
  ["F", "V", "P", "M", "R", "J", "W"],
  ["J", "Q", "C", "P", "N", "R", "F"],
  ["V", "H", "P", "S", "Z", "W", "R", "B"],
  ["B", "M", "J", "C", "G", "H", "Z", "W"],
];

let stacks2 = [
  ["W", "M", "L", "F"],
  ["B", "Z", "V", "M", "F"],
  ["H", "V", "R", "S", "L", "Q"],
  ["F", "S", "V", "Q", "P", "M", "T", "J"],
  ["L", "S", "W"],
  ["F", "V", "P", "M", "R", "J", "W"],
  ["J", "Q", "C", "P", "N", "R", "F"],
  ["V", "H", "P", "S", "Z", "W", "R", "B"],
  ["B", "M", "J", "C", "G", "H", "Z", "W"],
];

let arr = syncReadFile("./input.txt");
let moves = arr.map((el) => {
  let array = el.split(" ").map((num) => parseInt(num));
  return array;
});

console.log("moves >> ", moves);
let part1Moves = [...moves];
let part2Moves = [...moves];

for (let i = 0; i < part1Moves.length; i++) {
  let [boxCount, from, to] = part1Moves[i];
  from--;
  to--;

  while (boxCount > 0) {
    stacks1[to].push(stacks1[from].pop());

    boxCount--;
  }
}

for (let i = 0; i < part2Moves.length; i++) {
  let [boxCount, from, to] = part2Moves[i];
  from--;
  to--;

  stacks2[to] = [...stacks2[to], ...stacks2[from].slice(-boxCount)];

  for (let i = 0; i < boxCount; i++) {
    stacks2[from].pop();
  }
}

let stringPart1 = "";
let stringPart2 = "";

stacks1.forEach((el) => {
  stringPart1 += el[el.length - 1];
});

stacks2.forEach((el) => {
  stringPart2 += el[el.length - 1];
});

console.log("part1 Result", stringPart1);
console.log("part2 Result", stringPart2);
