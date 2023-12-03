import { syncReadFile } from "../utils.js";

let arr = syncReadFile("./input.txt", "\n");
// sample.txt expects 8 as answer for part 1
// sample2.txt expects 2286 as answer for part 2

console.log("arr : ", arr);

// Part 1
let gameMap = {};

arr = arr.map((game) => game.split(":"));
arr.forEach((game) => {
  let gameId = game[0].split(" ")[1];
  let sets = game[1].split(";");
  let gameObj = {
    blue: 0,
    green: 0,
    red: 0,
  };
  sets.forEach((set) => {
    let actions = set.split(",");
    actions.forEach((action) => {
      let [count, color] = action.trim().split(" ");
      console.log(count, color);
      gameObj[color] = Math.max(gameObj[color], count);
    });
  });

  gameMap[gameId] = gameObj;
});

console.log(gameMap);

let maxMap = {
  red: 12,
  blue: 14,
  green: 13,
};

// part 1
let sum = 0;

for (let game in gameMap) {
  let counts = gameMap[game];
  let isPossible = true;
  for (let color in counts) {
    if (maxMap[color] < counts[color]) {
      isPossible = false;
    }
  }

  if (isPossible) {
    sum += parseInt(game);
  }
}

console.log("Part 1", sum);

//part 2
let totalSum = 0;
for (let game in gameMap) {
  let counts = gameMap[game];
  let gamePower = 1;
  for (let color in counts) {
    gamePower *= counts[color];
  }

  totalSum += gamePower;
}
console.log("Part 2", totalSum);
