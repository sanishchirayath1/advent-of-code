import { readFileSync, promises as fsPromises } from "fs";

/*
This is a helper function that reads a file synchronously and returns its contents as an array of lines. It uses readFileSync to read the file and split to divide the contents into lines.
*/
export function syncReadFile(filename, splitBy = /\r?\n/) {
  const contents = readFileSync(filename, "utf-8");

  const arr = contents.split(splitBy);

  return arr;
}
/*
This is the main function that decodes the message. It reads the file, parses each line into a number and a word, sorts the lines by number, and then constructs the decoded message.
*/
function decode(message_file) {
  // Parse the message file
  let lines = syncReadFile(`./${message_file}`, "\n");
  /*  
  This line maps each line to an array of two elements: the number (parsed as an integer) and the word.
   */
  let elements = lines.map((line) => {
    let [num, word] = line.split(" ");
    return [parseInt(num), word];
  });
  // Sort the elements by the number
  elements.sort((a, b) => a[0] - b[0]);

  // Decode message
  let message = "";
  let len = 1;
  let index = 0;
  /*
  The while loop constructs the decoded message. It starts with the first element and then skips to the end of each "line" in a pyramid structure, adding the corresponding word to the message.
  */
  while (index < elements.length) {
    let word = elements[index][1];
    message += " " + word;
    index += len + 1;
    console.log(index);
    len++;
  }

  return message;
}

// Print the decoded message
console.log(decode("inter.txt"));
