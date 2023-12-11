import { syncReadFile } from "../utils.js";

let lines = syncReadFile("./input.txt", "\n");
// sample.txt expects 374 as answer for part 1
// sample2.txt expects 2 as answer for part 2

// Parse the input
let image = lines.map((x) => x.split(""));

console.log(image);

let nilRows = new Set();
let nilCols = new Set();
let galaxies = [];

// scan the rows
image.forEach((row, i) => {
  if (row.every((x) => x === ".")) {
    nilRows.add(i);
  }
});

// scan the columns
for (let i = 0; i < image[0].length; i++) {
  if (image.every((row) => row[i] === ".")) {
    nilCols.add(i);
  }
}

console.log(nilRows);
console.log(nilCols);

// find the galaxies
image.forEach((row, i) => {
  row.forEach((col, j) => {
    if (col === "#") {
      galaxies.push({ x: j, y: i });
    }
  });
});

console.log(galaxies);

function getSumOfDistances(nilMultiple = 2) {
  let sumOfDistances = 0;

  for (let i = 0; i < galaxies.length; i++) {
    let galaxy = galaxies[i];
    let start = i + 1;

    while (start < galaxies.length) {
      let other = galaxies[start];
      let distance =
        Math.abs(galaxy.x - other.x) + Math.abs(galaxy.y - other.y);
      // count of empty rows between the two galaxies
      let emptyRows = 0;
      let yMin = Math.min(galaxy.y, other.y);
      let yMax = Math.max(galaxy.y, other.y);

      for (let j = yMin + 1; j < yMax; j++) {
        if (nilRows.has(j)) {
          emptyRows++;
        }
      }
      // count of empty cols between the two galaxies
      let emptyCols = 0;
      let xMin = Math.min(galaxy.x, other.x);
      let xMax = Math.max(galaxy.x, other.x);

      for (let j = xMin + 1; j < xMax; j++) {
        if (nilCols.has(j)) {
          emptyCols++;
        }
      }

      distance = distance + (emptyRows + emptyCols) * (nilMultiple - 1);
      console.log(galaxy, other, distance);
      sumOfDistances += distance;
      start++;
    }
  }

  return sumOfDistances;
}

console.log("Part 1: ", getSumOfDistances());
console.log("Part 2: ", getSumOfDistances(100000));
