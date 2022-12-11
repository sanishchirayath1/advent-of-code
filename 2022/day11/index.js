import { syncReadFile } from "../utils.js";

let arr = syncReadFile("./input.txt", "\n\n");
// sample.txt expects 10605 as answer for part 1
// sample.txt expects 2713310158 as answer for part 2

console.log("arr : ", arr);

// processing the input
let monkeyMap = new Map();

arr.forEach((action) => {
  let monkeyAction = action.split("\n").map((item) => item.trim());

  processMonkeyAction(monkeyAction);
});

// end of processing the input

// part1
let isPart2 = true;
let inspectionRounds = isPart2 ? 10000 : 20;
let modulo = 1;

monkeyMap.forEach((monkeyObj) => {
  modulo *= monkeyObj.divisor;
});

for (let i = 0; i < inspectionRounds; i++) {
  executeRound();
}

console.log("monkeyMap : ", monkeyMap);

let inspectionCountArray = Array.from(monkeyMap.values()).map(
  (item) => item.inspectionCount
);

inspectionCountArray.sort((a, b) => b - a);
let top2Sum = inspectionCountArray.slice(0, 2).reduce((a, b) => a * b);

console.log("part1 : ", top2Sum);

// Helper functions
function executeRound() {
  monkeyMap.forEach((monkeyObj) => {
    monkeyObj.inspectionCount += monkeyObj.itemsArr.length;

    monkeyObj.itemsArr.map((item) => {
      let result = exectureOperation(item % modulo, monkeyObj.operation);
      result = isPart2 ? result : Math.floor(result / 3);
      if (result % monkeyObj.divisor === 0) {
        monkeyMap.get(monkeyObj.trueTo).itemsArr.push(result);
      } else {
        monkeyMap.get(monkeyObj.falseTo).itemsArr.push(result);
      }
    });

    monkeyObj.itemsArr = [];
  });
}

function processMonkeyAction(monkeyAction) {
  console.log("monkeyAction : ", monkeyAction);

  let monkey = parseInt(monkeyAction[0].split(" ")[1].replace(":", ""));
  let itemsArr = monkeyAction[1]
    .split(" ")
    .slice(2)
    .map((item) => parseInt(item.trim().replace(",", "")));
  let operation = monkeyAction[2].split(" ").slice(-2);
  let divisor = parseInt(monkeyAction[3].split(" ").slice(-1));
  let trueTo = parseInt(monkeyAction[4].split(" ").slice(-1));
  let falseTo = parseInt(monkeyAction[5].split(" ").slice(-1));

  operation = {
    operator: operation[0],
    value: parseInt(operation[1]),
  };

  const obj = {
    monkey,
    itemsArr,
    operation,
    divisor,
    trueTo,
    falseTo,
    inspectionCount: 0,
  };

  monkeyMap.set(monkey, obj);
}

function exectureOperation(item, operation) {
  let result;
  let value = Number.isNaN(operation.value) ? item : operation.value;
  switch (operation.operator) {
    case "+":
      result = item + value;
      break;
    case "*":
      result = item * value;
      break;
    case "%":
      result = item % value;
      break;
    case "/":
      result = item / value;
      break;
    case "-":
      result = item - value;
      break;
  }

  return result;
}
