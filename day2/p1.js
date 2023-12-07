const {readFileSync } = require('fs');
const content = readFileSync("./input.txt", 'utf-8');

const colorCapsMap = {
    red: 12,
    green: 13,
    blue: 14
}

const gamesCounter = []

content.split(/\r?\n/).forEach((line) => {
    const [gameNumber, ballSets ] = line.split(":");
    const game = gameNumber.split(" ")[1]
    let isPosible = true
    
    ballSets.split(";").forEach((subset) => {
        const set = subset.split(",")
        set.forEach((setVal) => {
            const [_, amount, color] = setVal.split(" ");
            if(parseInt(amount) > colorCapsMap[color]) isPosible = false
        })
    })
    if(isPosible) gamesCounter.push(parseInt(game))
})

console.log(gamesCounter.reduce((acc, cur) => acc + cur,0))



