const { readFileSync } = require('fs')
const content = readFileSync('./input.txt', 'utf-8')

const gamesCounter = []

content.split(/\r?\n/).forEach((line) => {
    const [gameNumber, ballSets] = line.split(':')
    const game = gameNumber.split(' ')[1]
    gamesCounter.push({
        red: 0,
        green: 0,
        blue: 0,
    })
    ballSets.split(';').forEach((subset) => {
        const set = subset.split(',')
        set.forEach((setVal) => {
            const [_, amount, color] = setVal.split(' ')
            if (gamesCounter[game - 1][color] < parseInt(amount)) {
                gamesCounter[game - 1][color] = parseInt(amount)
            }
        })
    })
})

console.log(
    gamesCounter
        .map((game) => game.red * game.blue * game.green)
        .reduce((acc, cur) => acc + cur, 0)
)
