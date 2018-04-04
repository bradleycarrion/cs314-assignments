'use strict';

/**
  *   Verifies that a variable is of type string
  *   @param s variable to be checked
  */
let verifyString = (s) => typeof s === 'string';

/**
  *   Verifies that the variable isn't undefined and has length > some value
  *   @param s string to be checked if undefined
  *   @param gt integer value for the length to be compared with
  */
let confirmDefinitionAndGreaterThan = (s, gt) => (s !== undefined && s.length > gt);

/**
  *   Prompts the user continuously until they enter some input
  *   @param msg is the message the user will be prompted with
  */
let promptUser = (msg) => {
  let response = prompt(msg);
  if (response !== null && response !== undefined) {
      return response;
  }

  promptUser(msg);
};

/**---------------------------
          Problem 1
----------------------------**/

/**
  *   Swaps the first and last character
  *   @param s the string to swap characters on
  */
let swapFirstAndLastChars = (s) => (s.length > 1) ? s.charAt(s.length - 1) +
                                    s.substr(1, s.length - 2) + s.charAt(0) : s;

let problem1Prompt  = "Please input some string with more than one character";
let problem1Success = "Reversing the fist and last characters gives us: ";
let problem1Error   = "You entered an invalid string.";

let runProblem1 = () => {
    let response    = promptUser(problem1Prompt);
    let p1UserInput = response.trim();
    let p1Output    = verifyString(p1UserInput) ? swapFirstAndLastChars(p1UserInput)
                                                : undefined;
    if(confirmDefinitionAndGreaterThan(p1Output, 1)) {
      alert(problem1Success + p1Output);
      return;
    }

    // error if we reach this
    alert(problem1Error);
    runProblem1();
};

runProblem1();

/**---------------------------
          Problem 2
----------------------------**/

/**
  *   Appends 'Hi' to the beginning of a string (if it's not already there)
  *   @param s string to append 'hi' to
  */
let hiString = (s) => (s.substr(0, 2).toLowerCase() !== "hi") ? "Hi " + s : s;

// Reusing prompt messages from problem 1
let runProblem2 = () => {
  let response    = promptUser(problem1Prompt);
  let p2UserInput = response.trim();
  let p2Output    = verifyString(p2UserInput) ? hiString(p2UserInput) : undefined;

  if (confirmDefinitionAndGreaterThan(p2Output, 3)) {
    alert(p2Output);
    return;
  }

  // error if we reach this
  alert(problem1Error);
  runProblem2();
};

runProblem2();

/**---------------------------
          Problem 3
----------------------------**/

let problem3Success = "Moving the last three characters to the beginning gives us: ";

/**
  *   Appends the last 3 characters to the front of the string
  *   @param s string to change
  */
let appendLastThree = (s) => s.length > 2 ? s.substr(s.length - 3, s.length - 1) +
                             s.substr(0, s.length - 3) : s;
// Reusing prompt messages from problem 1
let runProblem3 = () => {
  let response    = promptUser(problem1Prompt);
  let p3UserInput = response.trim();
  let p3Output    = verifyString(p3UserInput) ? appendLastThree(p3UserInput) : undefined;

  if (confirmDefinitionAndGreaterThan(p3Output, 2)) {
    alert(problem3Success + p3Output);
    return;
  }

  // error with input if we reach this
  alert(problem1Error);
  runProblem3();
};

runProblem3();

/**---------------------------
          Problem 4
----------------------------**/

let problem4Prompt = "Enter a list of 3 things seperated by commas: ";

/**
  *   Generates sentence from list
  *   @param list list of words to use
  */
let problem4Sentence = list => `My name is ${list[0]}, ` +
                               `my favorite color is ${list[1]}, ` +
                               `and I love ${list[2]}`;

/**
  *   Takes a string and converts it to a list of elements
  *   @param s string to convert
  */
let stringToList = (s) => s.split(',').map(el => el.trim());

let runProblem4 = () => {
  let response    = promptUser(problem4Prompt);
  let p4UserInput = response.trim();
  let p4List      = stringToList(p4UserInput);
  let p4Output    = (p4List.length === 3) ? problem4Sentence(p4List) : undefined;

  if (confirmDefinitionAndGreaterThan(p4Output, 0)) {
    alert(`The user input: ${p4UserInput}\nThe sentence then is: ${p4Output}`);
    return;
  }

  // error with input if we reach this
  alert(problem1Error);
  runProblem4();
};

runProblem4();

/**---------------------------
          Problem 5
----------------------------**/

let problem5Prompt = "Please enter some string: ";

/**
  *   Converts the first three chars to lower case if greater than 3
  *   otherwise converts the whole string to upper case
  *   @param s string to modify
  */
let firstThreeToLower = (s) => (s.length <= 3) ? s.toUpperCase()
                               : s.substr(0, 3).toLowerCase() + s.substr(3, s.length - 1);

let runProblem5 = () => {
  let response    = promptUser(problem5Prompt);
  let p5UserInput = response.trim();
  let p5Output    = verifyString(p5UserInput) ? firstThreeToLower(p5UserInput) : undefined;

  if (confirmDefinitionAndGreaterThan(p5Output, 0)) {
    alert(`New string ${p5Output}`);
    return;
  }

  // error with input if we reach this
  alert(problem1Error);
  runProblem5();
};

runProblem5();

/**---------------------------
          Problem 6
----------------------------**/

let problem6Prompt = "Enter a list of numbers seperated by commas: ";

/**
  *   Swaps the first and last elements in the array
  *   @param list the array
  */
let swapFirstAndLastIntegers = list => {
  let temp = list[0];
  list[0] = list[list.length - 1];
  list[list.length - 1] = temp;
  return list;
};

let runProblem6 = (msg) => {
  let response  = promptUser(msg);
  if (response === undefined) {
    // error with input if we reach this
    alert(problem1Error);
    runProblem6(msg);
  }

  let p6UserInput = response.trim();
  let p6List;

  try {
      p6List = stringToList(p6UserInput).map(el => parseInt(el));
  } catch(error) {  // cannot convert string to int
      runProblem6("Error parsing integers.\n" + msg);
      return;
  }
  let p6Output = p6List.length > 0 ? swapFirstAndLastIntegers(p6List) : undefined;

  if (confirmDefinitionAndGreaterThan(p6Output, 0)) {
    alert(`Your new list is ${p6Output}.`);
    return;
  }

  // error with input if we reach this
  alert(problem1Error);
  runProblem6(msg);
};

runProblem6(problem6Prompt);

/**---------------------------
          Problem 7
----------------------------**/

let problem7Prompt = "Please enter a list of strings seperated by commas: ";

/**
  *   Returns the longest string in the array
  *   @param list array to be searched
  */
let findLongestString = list => list.sort()[0];

let runProblem7 = () => {
  let response    = promptUser(problem7Prompt);
  if (response === undefined) { // error with input if we reach this
    alert(problem1Error);
    runProblem7();
  }

  let p7UserInput = response.trim();
  let p7List      = stringToList(p7UserInput);
  let p7Output    = p7List.length > 0 ? findLongestString(p7List) : undefined;

  if (confirmDefinitionAndGreaterThan(p7Output, 0)) {
    alert(`The longest string is: ${p7Output}`);
    return;
  }

  // error with input if we reach this
  alert(problem1Error);
  runProblem7();
};

runProblem7();

/**---------------------------
          Problem 8
----------------------------**/

let problem8Error = "There are no even numbers";

/**
  *   Swaps the first and last elements in the array
  *   @param list the array
  */
let findLargestEvenNumber = list => list.sort((a, b) => b - a).find(num => (num % 2) === 0);

let runProblem8 = (msg) => {
  let response  = promptUser(msg);
  if (response === undefined) {
    // error with input if we reach this
    alert(problem1Error);
    runProblem8(msg);
  }

  let p8UserInput = response.trim();
  let p8List;

  try {
      p8List = stringToList(p8UserInput).map(el => parseInt(el));
  } catch(error) {  // cannot convert string to int
      runProblem8("Error parsing integers.\n" + msg);
      return;
  }

  let largestEvenNumber = findLargestEvenNumber(p8List);
  if (largestEvenNumber === undefined) {
    alert(problem8Error);
    return;
  }

  let p8Output = p8List.length > 0 ? largestEvenNumber : undefined;

  if (p8Output !== undefined) {
    alert(`The largest even number is ${p8Output}`);
    return;
  }

  // error with input if we reach this
  alert(problem1Error);
  runProblem8(msg);
};

runProblem8(problem6Prompt);

/**---------------------------
          Problem 9
----------------------------**/

let runProblem9 = () => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let d = new Date();
  let ampm = d.getHours() > 12 ? 'PM' : 'AM';
  let hours = d.getHours() % 12;
  alert(`Today is ${daysOfWeek[d.getDay()]}.\nIt is ${hours}:${d.getMinutes()}${ampm}`);
};

runProblem9();

/**---------------------------
          Problem 10
----------------------------**/

let unlimitedArgs = (...args) => alert(args);

let runProblem10 = () => {
  unlimitedArgs("1", true, new Date(), "test", 1, 2, 3, 10);
};

runProblem10();
