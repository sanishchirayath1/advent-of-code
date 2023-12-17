import { syncReadFile } from "../utils.js";

let lines = syncReadFile(`./sample.txt`, "\n");
// sample.txt expects 46 as answer for part 1
// sample.txt expects 145 as answer for part 2
let tiles = lines.map((line) => line.split(""));

function part1() {}

function part2() {}

console.log("Part 1", part1());
console.log("Part 2", part2());
