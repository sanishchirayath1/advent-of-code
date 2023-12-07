const part1 = () => {
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
  const handValueA = determineHandValue(handA);
  const handValueB = determineHandValue(handB);
  if (handValueA > handValueB) return -1; // Hand A wins
  if (handValueB > handValueA) return 1; // Hand b wins
  return determineTieBreaker(handA, handB); // -1 hand A wins 1 hand B wins
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
  J: 11,
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

console.log(part1());
