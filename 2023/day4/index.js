import { syncReadFile } from "../utils.js";

let arr = syncReadFile("./input.txt", "\n");
// sample.txt expects 13 as answer for part 1
// sample.txt expects 30 as answer for part 2

let cardMap = {};

// Parse the input into a map of cardId to {winners, myNumbers}
// {
//   'Card 1': {
//     winners: [ 41, 48, 83, 86, 17 ],
//     myNumbers: Set(8) { 83, 86, 6, 31, 17, 9, 48, 53 }
//   },
//   'Card 2': {
//     winners: [ 13, 32, 20, 16, 61 ],
//     myNumbers: Set(8) { 61, 30, 68, 82, 17, 32, 24, 19 }
//   }
// }
for (let i = 0; i < arr.length; i++) {
  let [cardText, numbers] = arr[i].split(":");
  let cardId = cardText
    .trim()
    .split(" ")
    .filter((str) => str !== "")[1];

  let [winners, myNumbers] = numbers
    .trim()
    .split("|")
    .map((str) => str.trim())
    .map((str) =>
      str
        .split(" ")
        .filter((str) => str !== "")
        .map((str) => parseInt(str))
    );

  cardMap[cardId] = { winners, myNumbers: new Set(myNumbers) };
}
let matchesByCardId = new Map();

// Part 1
function getTotalPoints(cardDetails) {
  let totalPoints = 0;
  for (let cardId in cardDetails) {
    let matches = 0;
    let { winners, myNumbers } = cardDetails[cardId];
    winners.forEach((number) => {
      if (myNumbers.has(number)) {
        matches++;
      }
    });

    matchesByCardId.set(cardId, matches);

    if (matches > 0) {
      let points = Math.pow(2, matches - 1);
      totalPoints += points;
    }
  }

  return totalPoints;
}

console.log("Part 1", getTotalPoints(cardMap));

// Part 2
console.log(matchesByCardId);
function getTotalScratchCards() {
  let totalScratchCards = 0;

  for (let [id, matches] of matchesByCardId) {
    let stack = [id];
    while (stack.length) {
      totalScratchCards++;
      let currentId = stack.pop();
      let matchesCount = matchesByCardId.get(currentId);
      if (matchesCount < 1) {
        continue;
      }

      for (let i = 1; i <= matchesCount; i++) {
        let nextId = parseInt(currentId) + i;
        stack.push(String(nextId));
      }
    }
  }

  return totalScratchCards;
}

console.log("Part 2", getTotalScratchCards());
