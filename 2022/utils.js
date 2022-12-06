// const { readFileSync, promises: fsPromises } = require("fs");
import { readFileSync, promises as fsPromises } from "fs";

export function syncReadFile(filename, splitBy = /\r?\n/) {
  const contents = readFileSync(filename, "utf-8");

  const arr = contents.split(splitBy);

  return arr;
}
