import { syncReadFile } from "../utils.js";

// sample input
// dir a
// 14848514 b.txt
// 8504156 c.dat
// dir d
// $ cd a
// $ ls
// dir e
// 29116 f
// 2557 g
// 62596 h.lst
// $ cd e
// $ ls
// 584 i
// $ cd ..
// $ cd ..
// $ cd d
// $ ls
// 4060174 j
// 8033020 d.log
// 5626152 d.ext
// 7214296 k

let arr = syncReadFile("./input.txt");
// sample.txt expects 95437 as answer for part 1

let directories = {};
let currentDir;

arr.forEach((line) => {
  if (isCommand(line)) {
    let command = line.split(" ");
    if (command[1] === "cd") {
      let prev = currentDir;
      currentDir =
        command[2] === ".." ? directories[currentDir].parent : command[2];

      if (!directories[currentDir] && currentDir === "/") {
        directories[currentDir] = {
          parent: null,
          dirName: currentDir,
          fileSize: 0,
          children: [],
        };
      }

      if (!directories[currentDir]) {
        directories[currentDir] = {
          parent: prev,
          dirName: currentDir,
          fileSize: 0,
          children: [],
        };
      }
    } else if (command[1] === "ls") {
      // do something
    }
  } else if (isDir(line)) {
    let dirName = line.split(" ")[1];
    directories[currentDir].children.push(dirName);
  } else if (isFile(line)) {
    let fileSize = parseInt(line.split(" ")[0]);
    directories[currentDir].fileSize += fileSize;
  }
});

// add up all the file sizes of  the children to get the total file size of the parent
// do this recursively
let memoized = {};
Object.keys(directories).forEach((dir) => {
  directories[dir].totalFileSize = getTotalFileSize(directories[dir], memoized);
});

// part 1
let sum = 0;
Object.keys(directories).forEach((dir) => {
  if (directories[dir].totalFileSize <= 100000) {
    sum += directories[dir].totalFileSize;
  }
});

console.log(directories);

console.log(sum);

// helper functions
function isCommand(line) {
  return line.includes("$");
}

function isDir(line) {
  return line.includes("dir");
}

function isFile(line) {
  // starts with a number
  return !isNaN(parseInt(line[0]));
}

function getTotalFileSize(dir, memo) {
  if (memo[dir.dirName]) {
    return memo[dir.dirName];
  }

  let sum = dir.fileSize;
  // iterate through the children and add up their file sizes do not do this recursively
  dir.children.forEach((child) => {
    sum += directories[child].fileSize;
  });

  memo[dir.dirName] = sum;
  return sum;
}
