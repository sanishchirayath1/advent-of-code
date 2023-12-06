import { syncReadFile } from "../utils.js";

let arr = syncReadFile("./input.txt", "\n");
// sample.txt expects 352 as answer for part 1
// sample.txt expects 46 as answer for part 2

// Parse the input

console.log(arr);
let timeData = arr[0]
  .split(":")[1]
  .split(" ")
  .filter((x) => x != "")
  .map((x) => parseInt(x));

let distanceData = arr[1]
  .split(":")[1]
  .split(" ")
  .filter((x) => x != "")
  .map((x) => parseInt(x));

console.log(timeData, distanceData);

// Part 1
let productOfWaysTobeatTheRecord = 1;

for (let i = 0; i < timeData.length; i++) {
  let distanceToTravel = distanceData[i];
  let time = timeData[i];
  let numberOfWaysToBeatTheRecord = 0;

  for (let j = 1; j <= time; j++) {
    let speed = j;
    let timeRemaining = time - j;
    let distanceCovered = speed * timeRemaining;

    if (distanceToTravel <= distanceCovered) {
      numberOfWaysToBeatTheRecord++;
    }
  }

  console.log("numberOfWaysToBeatTheRecord", numberOfWaysToBeatTheRecord);

  productOfWaysTobeatTheRecord *= numberOfWaysToBeatTheRecord;
}

console.log("Part 1", productOfWaysTobeatTheRecord);

// Part 2
let timeData2 = parseInt(timeData.join(""));
let distanceData2 = parseInt(distanceData.join(""));

console.log(timeData2, distanceData2);

let numberOfWaysToBeatTheRecord = 0;

for (let i = 1; i <= timeData2; i++) {
  let speed = i;
  let timeRemaining = timeData2 - i;
  let distanceCovered = speed * timeRemaining;

  if (distanceData2 <= distanceCovered) {
    numberOfWaysToBeatTheRecord++;
  }
}

console.log("Part 2", numberOfWaysToBeatTheRecord);
