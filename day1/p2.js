const {readFileSync } = require('fs');

const content = readFileSync("./input.txt", 'utf-8');

let totalAmount = 0;
const numbersArray = [];

const digitsMap = {
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    'eight': 8,
    'nine': 9,
}

content.split(/\r?\n/).forEach((line) => {
    const matches = [...line.matchAll(/(?=(\d|two|one|three|four|five|six|seven|eight|nine))/g)]
    let [firstDigit, secondDigit] = [matches[0][1], matches[matches.length - 1][1]];
    if(firstDigit in digitsMap) firstDigit = digitsMap[firstDigit];
    if(secondDigit in digitsMap) secondDigit = digitsMap[secondDigit];
    const parsedNumber = parseInt(`${firstDigit}${secondDigit}`)
    numbersArray.push(parsedNumber);
    totalAmount += parsedNumber;
});
console.log("numbersArray: ", numbersArray)
console.log("totalAmount:" ,totalAmount)