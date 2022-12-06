import { syncReadFile } from "../utils.js";

let stacks = [
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

let part1Stacks = stacks.map((el) => el);
let part2Stacks = stacks.map((el) => el);

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
    part1Stacks[to].push(part1Stacks[from].pop());

    boxCount--;
  }
}

for (let i = 0; i < part2Moves.length; i++) {
  let [boxCount, from, to] = part2Moves[i];
  from--;
  to--;

  part2Stacks[to] = [...part2Stacks[to], ...part2Stacks[from].slice(-boxCount)];

  for (let i = 0; i < boxCount; i++) {
    part2Stacks[from].pop();
  }
}

// console.log('Ending stack Part1', part1Stacks);
// console.log('Ending stack Part2', part2Stacks);

let stringPart1 = "";
let stringPart2 = "";

part1Stacks.forEach((el) => {
  stringPart1 += el[el.length - 1];
});

part2Stacks.forEach((el) => {
  stringPart2 += el[el.length - 1];
});

console.log("part1 Result", stringPart1);
console.log("part2 Result", stringPart2);
