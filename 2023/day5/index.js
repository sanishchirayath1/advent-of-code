import { syncReadFile } from "../utils.js";

let arr = syncReadFile("./sample.txt", "\n\n");
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
let seeds2 = [];
console.log(infoMap);
for (let i = 0; i < seeds.length; i += 2) {
  let [seedStart, length] = seeds.slice(i, i + 2);
  seeds2.push([seedStart, seedStart + length]);
}
console.log(seeds2);

function getMinLocationSecondPart() {
  let keys = [...infoMap.keys()].filter((key) => key !== "seeds");
  console.log(keys);

  for (let i = 0; i < keys.length; i++) {
    let ranges = infoMap.get(keys[i]);
    let newSeeds = [];

    while (seeds2.length) {
      let [start, end] = seeds2.pop();
      for (let j = 0; j < ranges.length; j++) {
        let [destinationStart, sourceStart, length] = ranges[j];
        let overlapStart = Math.max(start, sourceStart);
        let overlapEnd = Math.min(end, sourceStart + length);
        if (overlapStart < overlapEnd) {
          newSeeds.push([
            overlapStart - sourceStart + destinationStart,
            overlapEnd - sourceStart + destinationStart,
          ]);
          if (overlapStart > start) {
            newSeeds.push([start, overlapStart]);
          }
          if (overlapEnd < end) {
            newSeeds.push([overlapEnd, end]);
          }
          break;
        }
      }
    }

    seeds2 = newSeeds;
  }

  console.log(seeds2);

  console.log(Math.min(...seeds2.map(([start]) => start)));

  // while (seeds2.length) {
  //   let [start, end] = seeds2.pop();
  //   for (let i = 0; i < keys.length; i++) {
  //     let [destinationStart, sourceStart, length] = infoMap.get(keys[i]);
  //     let overlapStart = Math.max(start, sourceStart);
  //     let overlapEnd = Math.min(end, sourceStart + length);
  //     if (overlapStart < overlapEnd) {
  //       newSeeds.push([
  //         overlapStart - sourceStart + destinationStart,
  //         overlapEnd - sourceStart + destinationStart,
  //       ]);
  //       if (overlapStart > start) {
  //         newSeeds.push([start, overlapStart]);
  //       }
  //       if (overlapEnd < end) {
  //         newSeeds.push([overlapEnd, end]);
  //       }
  //       break;
  //     }
  //   }

  //   newSeeds.push([start, end]);
  // }
  // return Math.min(...newSeeds.map(([start]) => start));
}

console.log("Part 2", getMinLocationSecondPart());
