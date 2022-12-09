import { syncReadFile } from "../utils.js";

// R 4
// U 4
// L 3
// D 1
// R 4
// D 1
// L 5
// R 2

let arr = syncReadFile("./input.txt");
// sample.txt expects 13 as answer for part 1
// sample.txt expects 36 as answer for part 2

arr = arr.map((item) => {
  return item.split(" ");
});

let maxX = 0;
let maxY = 0;
let minX = Infinity;
let minY = Infinity;
let startXY = [0, 0];

arr.forEach((item) => {
  let [direction, distance] = item;

  switch (direction) {
    case "R":
      startXY[0] += parseInt(distance);
      maxX = Math.max(maxX, startXY[0]);
      minX = Math.min(minX, startXY[0]);
      break;
    case "U":
      startXY[1] += parseInt(distance);
      maxY = Math.max(maxY, startXY[1]);
      minY = Math.min(minY, startXY[1]);
      break;
    case "L":
      startXY[0] -= parseInt(distance);
      maxX = Math.max(maxX, startXY[0]);
      minX = Math.min(minX, startXY[0]);
      break;
    case "D":
      startXY[1] -= parseInt(distance);
      maxY = Math.max(maxY, startXY[1]);
      minY = Math.min(minY, startXY[1]);
      break;
  }
});

console.log("maxX : ", maxX);
console.log("maxY : ", maxY);

let grid = new Array(maxY + Math.abs(minY) + 1).fill(0).map(() => {
  return new Array(maxX + Math.abs(minX) + 1).fill(0);
});

console.log("grid : ", grid);

startXY = [Math.abs(minX), Math.abs(minY)];
// let positionHeadXY = [...startXY];
// let positionTailXY = [...startXY];

let snakeLength = 10;

let snake = new Array(snakeLength).fill(0).map(() => {
  let [first, second] = startXY;
  return [first, second];
});

console.log("snake : ", snake);

arr.forEach((item) => {
  let [direction, distance] = item;

  switch (direction) {
    case "R":
      for (let i = 0; i < parseInt(distance); i++) {
        snake[0][0]++;
        for (let index = 1; index < snake.length; index++) {
          handleBlockMovement(index - 1, index);
        }
      }
      break;
    case "U":
      for (let i = 0; i < parseInt(distance); i++) {
        snake[0][1]++;
        for (let index = 1; index < snake.length; index++) {
          handleBlockMovement(index - 1, index);
        }
      }
      break;
    case "L":
      for (let i = 0; i < parseInt(distance); i++) {
        snake[0][0]--;
        for (let index = 1; index < snake.length; index++) {
          handleBlockMovement(index - 1, index);
        }
      }
      break;
    case "D":
      for (let i = 0; i < parseInt(distance); i++) {
        snake[0][1]--;
        for (let index = 1; index < snake.length; index++) {
          handleBlockMovement(index - 1, index);
        }
      }
      break;
  }
});

function handleBlockMovement(headIndex, tailIndex) {
  let [headX, headY] = snake[headIndex];
  let [tailX, tailY] = snake[tailIndex];

  const goRight = headX > tailX && Math.abs(headX - tailX) > 1;
  const goLeft = headX < tailX && Math.abs(headX - tailX) > 1;
  const goUp = headY > tailY && Math.abs(headY - tailY) > 1;
  const goDown = headY < tailY && Math.abs(headY - tailY) > 1;

  const goRightUp =
    (goRight && goUp) || (goUp && headX > tailX) || (goRight && headY > tailY);
  const goRightDown =
    (goRight && goDown) ||
    (goDown && headX > tailX) ||
    (goRight && headY < tailY);
  const goLeftUp =
    (goLeft && goUp) || (goUp && headX < tailX) || (goLeft && headY > tailY);
  const goLeftDown =
    (goLeft && goDown) ||
    (goDown && headX < tailX) ||
    (goLeft && headY < tailY);

  if (goRightUp) {
    tailX++;
    tailY++;
  } else if (goRightDown) {
    tailX++;
    tailY--;
  } else if (goLeftUp) {
    tailX--;
    tailY++;
  } else if (goLeftDown) {
    tailX--;
    tailY--;
  } else if (goRight) {
    tailX++;
  } else if (goLeft) {
    tailX--;
  } else if (goUp) {
    tailY++;
  } else if (goDown) {
    tailY--;
  }
  snake[tailIndex] = [tailX, tailY];
  console.log(snake);

  if (tailIndex === snake.length - 1) {
    grid[tailY][tailX] = 1;
  }
}

console.log("grid : ", grid);

let visited = grid.flat().filter((item) => item === 1).length;

console.log("part1 >> ", visited);
