// DISCLAIMER: this solution is crap

const { readFileSync } = require('fs')
const content = readFileSync('./input.txt', 'utf-8')

const getCardMatches = ({ winners, cardNumbers }) =>
    cardNumbers.reduce((acc, cur) => {
        if (winners.includes(cur)) acc += 1
        return acc
    }, 0)

const cardDeck = [
    {
        id: '0',
        winners: [],
        cardNumbers: [],
    },
]
let outputDeck = []

content.split(/\r?\n/).forEach((line) => {
    const [cardNumber, numbers] = line.split(':')
    const [winners, myNumbers] = numbers.split(' | ')
    cardDeck.push({
        id: cardNumber.match(/\d+/)[0],
        winners: winners
            .split(' ')
            .map((n) => parseInt(n))
            .filter(Boolean),
        cardNumbers: myNumbers
            .split(' ')
            .map((n) => parseInt(n))
            .filter(Boolean),
    })
})

outputDeck = [...cardDeck]
const builtTrees = {}

const solveTree = (tree) => {
    let currentPos = 1
    let prebuiltCounter = 0
    const localTree = [...tree]
    let shouldContinue = true

    while (shouldContinue) {
        const currentDeck = localTree[currentPos]

        if (currentDeck) {
            const amountOfMatches = getCardMatches(currentDeck)
            for (let i = amountOfMatches; i > 0; i--) {
                const nextDeckId = `${parseInt(currentDeck.id) + i}`
                if (!builtTrees[nextDeckId]) {
                    localTree.splice(
                        currentPos + 1,
                        0,
                        cardDeck.find(
                            (d) => d.id === `${parseInt(currentDeck.id) + i}`
                        )
                    )
                } else {
                    prebuiltCounter += builtTrees[nextDeckId]
                }
            }
        }
        currentPos++
        if (currentPos === outputDeck.length) shouldContinue = false
    }

    return localTree.length + prebuiltCounter
}

for (let deckI = outputDeck.length - 1; deckI > 0; deckI--) {
    const currentDeck = outputDeck[deckI]

    const localTree = []
    const amountOfMatches = getCardMatches(currentDeck)
    if (!builtTrees[currentDeck.id]) {
        if (amountOfMatches === 0) {
            builtTrees[currentDeck.id] = 1
            continue
        }

        for (let i = 1; i <= amountOfMatches; i++) {
            const nextDeckId = `${parseInt(currentDeck.id) + i}`
            localTree.push(cardDeck.find((d) => d.id === nextDeckId))
        }

        if (!builtTrees[currentDeck.id]) {
            builtTrees[currentDeck.id] = solveTree([currentDeck, ...localTree])
        }
    } else if (builtTrees[currentDeck.id]) builtTrees[currentDeck.id] += 1
}

console.log(
    Object.keys(builtTrees).reduce((acc, cur) => {
        return acc + builtTrees[cur]
    }, 0)
)
