import { syncReadFile } from "../utils.js";

let arr = syncReadFile("./input.txt", "\n\n");
// sample.txt expects 35 as answer for part 1
// sample.txt expects 46 as answer for part 2

let infoMap = new Map();

// Parse the input
for (let i = 0; i < arr.length; i++) {
  let [key, numStr] = arr[i].split(":");
  key = key.trim().split(" ")[0];
  let numArr = numStr
    .trim()
    .split("\n")
    .map((str) => str.trim())
    .map((str) => str.split(" ").map((str) => parseInt(str)));
  infoMap.set(key, numArr);
}

infoMap.set("seeds", infoMap.get("seeds")[0]);

// console.log(infoMap);

function getMinLocation(seeds) {
  let minLocation = Infinity;
  let keys = [...infoMap.keys()].filter((key) => key !== "seeds");
  console.log(keys);
  for (let i = 0; i < seeds.length; i++) {
    let seed = seeds[i];
    keys.forEach((key) => {
      let ranges = infoMap.get(key);
      for (let j = 0; j < ranges.length; j++) {
        let destinationStart = ranges[j][0];
        let sourceStart = ranges[j][1];
        let length = ranges[j][2];
        let sourceEnd = sourceStart + length;
        if (seed >= sourceStart && seed <= sourceEnd) {
          let offset = destinationStart - sourceStart;
          let destination = seed + offset;
          seed = destination;
          console.log(key, seed);
          break;
        }
      }
    });
    console.log("Location", seed);
    console.log("\n");
    if (seed < minLocation) {
      minLocation = seed;
    }
  }

  console.log(minLocation);
  return minLocation;
}
// Part 1
let seeds = infoMap.get("seeds");
console.log("Part 1", getMinLocation(seeds));

//Part 2
console.log("Part 2", getMinLocationSecondPart(seeds));

function getMinLocationSecondPart(seeds) {
  let minLocation = Infinity;
  let keys = [...infoMap.keys()].filter((key) => key !== "seeds");
  console.log(keys);
  for (let i = 0; i < seeds.length; i += 2) {
    let [seedStart, length] = seeds.slice(i, i + 2);
  }

  console.log(minLocation);
  return minLocation;
}
