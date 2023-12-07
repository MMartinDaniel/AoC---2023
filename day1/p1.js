const {readFileSync } = require('fs');

const content = readFileSync("./input.txt", 'utf-8');

let totalAmount = 0;
const numbersArray = [];

content.split(/\r?\n/).forEach((line) => {
    const matches = line.match(/\d/g);
    const [firstDigit, secondDigit] = [matches[0], matches[matches.length - 1]];
    const parsedNumber = parseInt(`${firstDigit}${secondDigit}`)
    numbersArray.push(parsedNumber);
    totalAmount += parsedNumber;
});
console.log("totalAmount: ", totalAmount)