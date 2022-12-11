import { syncReadFile } from "../utils.js";

let arr = syncReadFile("./sample.txt", "\n\n");
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
let inspectionRounds = 10000;

for (let i = 0; i < inspectionRounds; i++) {
  console.log("Round : ", i);
  executeRound();
}

// console.log("monkeyMap : ", monkeyMap);

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

    monkeyObj.itemsArr.forEach((item) => {
      let result = exectureOperation(item, monkeyObj.operation);
      result = Math.floor(result / 3n);

      // console.log("result : ", result);
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
  // console.log("monkeyAction : ", monkeyAction);

  let monkey = BigInt(monkeyAction[0].split(" ")[1].replace(":", ""));
  let itemsArr = monkeyAction[1]
    .split(" ")
    .slice(2)
    .map((item) => BigInt(item.trim().replace(",", "")));
  let operation = monkeyAction[2].split(" ").slice(-2);
  let divisor = BigInt(monkeyAction[3].split(" ").slice(-1));
  let trueTo = BigInt(monkeyAction[4].split(" ").slice(-1));
  let falseTo = BigInt(monkeyAction[5].split(" ").slice(-1));

  operation = {
    operator: operation[0],
    value:
      Number.isNaN(operation[1]) || !typeof operation[1] !== "bigInt"
        ? NaN
        : BigInt(operation[1]),
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
      result = BigInt(item + value);
      break;
    case "*":
      result = BigInt(item * value);
      break;
    case "%":
      result = BigInt(item % value);
      break;
    case "/":
      result = BigInt(item / value);
      break;
    case "-":
      result = BigInt(item - value);
      break;
  }

  return result;
}
