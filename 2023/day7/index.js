import { syncReadFile } from "../utils.js";

let lines = syncReadFile("./input.txt", "\n");
// sample.txt expects 6440 as answer for part 1
// sample.txt expects 5905 as answer for part 2

// Parse the input

// Parse Input
// const cardValueMap = new Map([
//   ["A", 14],
//   ["K", 13],
//   ["Q", 12],
//   ["J", 11],
//   ["T", 10],
//   ["9", 9],
//   ["8", 8],
//   ["7", 7],
//   ["6", 6],
//   ["5", 5],
//   ["4", 4],
//   ["3", 3],
//   ["2", 2],
// ]);

// const cardValueMap2 = new Map([
//   ["A", 13],
//   ["K", 12],
//   ["Q", 11],
//   ["T", 10],
//   ["9", 9],
//   ["8", 8],
//   ["7", 7],
//   ["6", 6],
//   ["5", 5],
//   ["4", 4],
//   ["3", 3],
//   ["2", 2],
//   ["J", 1],
// ]);

// let bidMap = new Map();
// arr.forEach((line) => {
//   let [hand, bid] = line.split(" ");
//   let handInfo = getHandPoint(hand);
//   bidMap.set(hand, [parseInt(bid), ...handInfo]);
// });

// // Part 1
// const hands = [...bidMap.keys()];
// // sort hands by handPoint
// // for same handPoint, hand with high value first card at start wins
// // if first card is same, then second card, and so on
// hands.sort((a, b) => {
//   let [aBid, aHandPoint] = bidMap.get(a);
//   let [bBid, bHandPoint] = bidMap.get(b);

//   if (aHandPoint == bHandPoint) {
//     let aCards = a.split("");
//     let bCards = b.split("");

//     for (let i = 0; i < aCards.length; i++) {
//       let aCardValue = cardValueMap.get(aCards[i]);
//       let bCardValue = cardValueMap.get(bCards[i]);

//       if (aCardValue != bCardValue) {
//         return bCardValue - aCardValue;
//       }
//     }
//   } else {
//     return bHandPoint - aHandPoint;
//   }
// });

// let rankSum = 0;

// for (let i = 0; i < hands.length; i++) {
//   let diff = hands.length - i;
//   let [bid, _] = bidMap.get(hands[i]);
//   rankSum += bid * diff;
// }

// console.log("Part 1", rankSum);

// // Part 2
// let bidMap2 = new Map();
// arr.forEach((line) => {
//   let [hand, bid] = line.split(" ");
//   let handInfo = getHandPoint(hand, true);
//   bidMap2.set(hand, [parseInt(bid), ...handInfo]);
// });

// hands.sort((a, b) => {
//   let [aBid, aHandPoint] = bidMap2.get(a);
//   let [bBid, bHandPoint] = bidMap2.get(b);

//   if (aHandPoint == bHandPoint) {
//     let aCards = a.split("");
//     let bCards = b.split("");

//     for (let i = 0; i < aCards.length; i++) {
//       let aCardValue = cardValueMap2.get(aCards[i]);
//       let bCardValue = cardValueMap2.get(bCards[i]);

//       if (aCardValue != bCardValue) {
//         return bCardValue - aCardValue;
//       }
//     }
//   } else {
//     return bHandPoint - aHandPoint;
//   }
// });

// rankSum = 0;

// for (let i = 0; i < hands.length; i++) {
//   let diff = hands.length - i;
//   let [bid, _] = bidMap2.get(hands[i]);
//   rankSum += bid * diff;
// }

// console.log("Part 2", rankSum);

// /* Helper functions */

// /*
// Five cards in each hand
// Five of a kind: 7
// Four of a kind: 6
// Full house: 5
// Three of a kind: 4
// Two pair: 3
// One pair: 2
// High card: 1
// */

// function getHandPoint(hand, checkJoker = false) {
//   let cards = hand.split("");
//   let hasJoker = false;
//   let cardMap = new Map();

//   cards.forEach((card) => {
//     if (card == "J") {
//       hasJoker = true;
//     }

//     if (cardMap.has(card)) {
//       cardMap.set(card, cardMap.get(card) + 1);
//     } else {
//       cardMap.set(card, 1);
//     }
//   });

//   let cardMapValues = [...cardMap.values()];
//   let cardMapKeys = [...cardMap.keys()];
//   let cardMapValuesSet = new Set(cardMapValues);

//   let handPoint = 0;

//   if (cardMapValuesSet.size == 1 && cardMapKeys.length == 1) {
//     // Five of a kind
//     handPoint = 7;
//   } else if (cardMapValuesSet.size == 2 && cardMapKeys.length == 2) {
//     if (hasJoker && checkJoker) {
//       handPoint = 7;
//     } else {
//       // Four of a kind
//       if (cardMapValues.includes(4)) {
//         handPoint = 6;
//       } else {
//         // Full house
//         handPoint = 5;
//       }
//     }
//   } else if (cardMapValuesSet.size == 2 && cardMapKeys.length == 3) {
//     // Three of a kind
//     if (cardMapValues.includes(3)) {
//       // 3,1,1
//       if (hasJoker && checkJoker) {
//         handPoint = 5;
//       } else {
//         handPoint = 4;
//       }
//     } else {
//       // 2,2,1
//       if (hasJoker && checkJoker) {
//         let jokerCount = cardMap.get("J");
//         if (jokerCount == 2) {
//           handPoint = 6;
//         } else {
//           handPoint = 5;
//         }
//       } else {
//         // Two pair
//         handPoint = 3;
//       }
//     }
//   } else if (cardMapValuesSet.size == 2 && cardMapKeys.length == 4) {
//     if (hasJoker && checkJoker) {
//       handPoint = 4;
//     } else {
//       // One pair
//       handPoint = 2;
//     }
//   } else {
//     if (hasJoker && checkJoker) {
//       handPoint = 2;
//     } else {
//       // High card
//       handPoint = 1;
//     }
//   }

//   return [handPoint, hasJoker];
// }

const part2 = () => {
  lines.sort((a, b) => {
    const handA = a.split(" ")[0];
    const handB = b.split(" ")[0];
    return sortTwoHands(handA, handB);
  });

  lines.reverse();
  let totalWinnings = 0;
  for (let i = 0; i < lines.length; i++) {
    const bid = lines[i].split(" ")[1];
    totalWinnings += bid * (i + 1);
  }

  return totalWinnings;
};

const sortTwoHands = (handA, handB) => {
  const permutationsA = getAllPossibleValues(handA);
  const permutationsB = getAllPossibleValues(handB);
  const handValueA = permutationsA
    .map((hand) => determineHandValue(hand))
    .sort((a, b) => b - a)[0]; // Too lazy to make faster
  const handValueB = permutationsB
    .map((hand) => determineHandValue(hand))
    .sort((a, b) => b - a)[0];
  if (handValueA > handValueB) return -1; // Hand A wins
  if (handValueB > handValueA) return 1; // Hand b wins
  return determineTieBreaker(handA, handB); // -1 hand A wins 1 hand B wins
};

const containsWildCard = /J/;
const getAllPossibleValues = (hand) => {
  if (!containsWildCard.test(hand)) {
    return [hand];
  }

  const handSet = getHandSet(hand);
  const permutations = [];
  for (let key in handSet) {
    const s = hand;
    permutations.push(s.replace(/J/g, key));
  }

  return permutations;
};

/*
Five of a kind = 7
Four of a kind = 6
Full house = 5
Three of a kind = 4
Two pair = 3
One pair = 2
High card = 1
*/
const determineHandValue = (hand) => {
  const handSet = getHandSet(hand);

  let hasPair = false;
  let hasThreeOfAKind = false;
  for (let key in handSet) {
    const val = handSet[key];
    if (val === 5) {
      return 7; // Five of a kind
    } else if (val === 4) {
      return 6; // Four of a kind
    } else if ((val === 3 && hasPair) || (val === 2 && hasThreeOfAKind)) {
      return 5; // Full house
    } else if (val === 2 && hasPair) {
      return 3; // Two pair
    } else if (val === 3) {
      hasThreeOfAKind = true;
    } else if (val === 2) {
      hasPair = true;
    }
  }

  if (hasThreeOfAKind) return 4;
  if (hasPair) return 2;
  return 1; // high card
};

const getHandSet = (hand) => {
  const handSet = {};
  for (let i = 0; i < hand.length; i++) {
    handSet[hand[i]] = handSet[hand[i]] || 0;
    handSet[hand[i]] += 1;
  }
  return handSet;
};

const faceCardVals = {
  T: 10,
  J: 1,
  Q: 12,
  K: 13,
  A: 14,
};

const determineTieBreaker = (handA, handB) => {
  for (let i = 0; i < handA.length; i++) {
    const cardA = handA[i];
    const cardB = handB[i];
    const handAVal = isNaN(+cardA) ? faceCardVals[cardA] : +cardA;
    const handBVal = isNaN(+cardB) ? faceCardVals[cardB] : +cardB;

    if (handAVal > handBVal) return -1;
    if (handBVal > handAVal) return 1;
  }

  return 0;
};

console.log(part2());
