import { syncReadFile } from "../utils.js";

let arr = syncReadFile("./sample.txt", "\n\n");

console.log(arr);
