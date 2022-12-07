import * as fs from "fs/promises";
// this is not done by you, it is from the reddit post

async function main() {
  const input = (await fs.readFile("./input.txt")).toString().split("\n");

  // Flattening the FileTree
  const currPath = [];
  const fileTree = {};
  for (var i = 0; i < input.length; i++) {
    if (input[i].includes("$ cd") && input[i] !== "$ cd ..") {
      currPath.push(input[i].split(" ")[2]);
    } else if (input[i] === "$ cd ..") {
      currPath.pop();
    } else if (input[i] === "$ ls") {
      i++;
      if (!fileTree[currPath.join(" ")]) {
        fileTree[currPath.join(" ")] = [];
      }
      while (i < input.length && !input[i].includes("$ cd")) {
        if (input[i].includes("dir")) {
          var dir = currPath.join(" ") + " " + input[i].split(" ")[1];
          fileTree[currPath.join(" ")].push(dir);
        } else {
          fileTree[currPath.join(" ")].push(input[i]);
        }
        i++;
      }
      i--;
      continue;
    }
  }

  // Calculating the Size of Each Directory
  const sizeObj = {};
  const keys = Object.keys(fileTree);
  keys.forEach((key) => {
    sizeObj[key] = calculateSize(key, fileTree);
  });

  // PART 1
  const sizes = [];
  var part1 = 0;
  Object.values(sizeObj).forEach((size, idx) => {
    if (size <= 100000) {
      sizes.push(size);
      part1 += size;
    }
  });
  console.log("PART 1 : ", part1);

  // PART 2
  const updateSize = 30000000;
  const currentFree = 70000000 - sizeObj["/"];
  const required = updateSize - currentFree;
  // console.log("REQUIRED SPACE : ", required);
  var smallest = Infinity;
  Object.values(sizeObj).forEach((size) => {
    if (size < Infinity && size > required) {
      smallest = size;
    }
  });
  console.log("PART 2 : ", smallest);
}

// Calculate Size of Each Dir
function calculateSize(key, fileTree) {
  var size = 0;
  for (var i = 0; i < fileTree[key].length; i++) {
    var curr = fileTree[key][i];
    if (curr.includes("/")) {
      size += calculateSize(curr, fileTree);
    } else {
      size += parseInt(curr.split(" ")[0]);
    }
  }
  return size;
}

main();
