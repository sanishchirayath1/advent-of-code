import { syncReadFile } from "../utils.js";

let lines = syncReadFile(`./sample.txt`, "\n");
// sample.txt expects 102 as answer for part 1
// sample.txt expects 145 as answer for part 2

// Parse the input
let cityblocks = lines.map((line) =>
  line.split("").map((num) => parseInt(num))
);

/*
 * Each city block represents the heat loss that can happen when lava flows through it
 * Lava can only flow atmost 3 blocks straight in any direction, then it has to turn, and it can only turn 90 degrees, either left or right
 * Lava can only flow in one direction at a time
 * It cannot go back to a block it has already flowed through
 * The goal is to find the path sum (heat loss sum) that has the least heat loss
 */

// Part 1
// Create graph
let graph = new Map();

// Add nodes
for (let i = 0; i < cityblocks.length; i++) {
  for (let j = 0; j < cityblocks[i].length; j++) {
    graph.set(`${i},${j}`, []);
  }
}

// Add edges
for (let i = 0; i < cityblocks.length; i++) {
  for (let j = 0; j < cityblocks[i].length; j++) {
    // Add edges for each node
    // Check if node is at the edge of the grid
    let isInBounds = (i, j) => {
      return (
        i >= 0 && i < cityblocks.length && j >= 0 && j < cityblocks[i].length
      );
    };

    if (isInBounds(i + 1, j)) {
      graph
        .get(`${i},${j}`)
        .push({ node: `${i + 1},${j}`, weight: cityblocks[i + 1][j] });
    }

    if (isInBounds(i - 1, j)) {
      graph.get(`${i},${j}`).push({
        node: `${i - 1},${j}`,
        weight: cityblocks[i - 1][j],
      });
    }

    if (isInBounds(i, j + 1)) {
      graph.get(`${i},${j}`).push({
        node: `${i},${j + 1}`,
        weight: cityblocks[i][j + 1],
      });
    }

    if (isInBounds(i, j - 1)) {
      graph.get(`${i},${j}`).push({
        node: `${i},${j - 1}`,
        weight: cityblocks[i][j - 1],
      });
    }
  }
}

console.log(graph);

// Find the path with the least heat loss
