const { readFileSync } = require('fs')
const content = readFileSync('./input.txt', 'utf-8')

let total = 0
content.split(/\r?\n/).forEach((line) => {
    const [cardNumber, numbers] = line.split(':')
    const [winners, myNumbers] = numbers.split(' | ')
    const winnerMatches = winners
        .split(' ')
        .map((n) => parseInt(n))
        .filter(Boolean)
    const myNumbersMatches = myNumbers
        .split(' ')
        .map((n) => parseInt(n))
        .filter(Boolean)

    let amountOfWinnerNumbers = 0
    const currentCardTotal = myNumbersMatches.reduce((acc, cur) => {
        if (winnerMatches.includes(cur)) {
            if (amountOfWinnerNumbers === 0) acc = 1
            else acc *= 2
            amountOfWinnerNumbers++
        }
        return acc
    }, 0)
    total += currentCardTotal
})
console.log(total)
