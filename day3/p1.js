const {readFileSync } = require('fs');
const content = readFileSync("./input.txt", 'utf-8');

const isDigit = (e) => e.match(/\d/g)
const isSymbol = (s) =>s.match(/\*|#|\*|\=|\/|\@|\%|\&|\-|\+|\$/g)

const hasSymbolAround = (arr, position) => {
    for (let r = position.x-1; r <= position.x + 1; r++) {
        const row = arr[r];
        if(row) {
            for (let column = position.y -1; column <= position.y +1; column++) {
                const element = row[column]
                if( element && isSymbol(element)) return true
            }
        }
    }
    return false
}

const engineArray = []
const numbersWithWSymbolsAround = []
let currentNumber = []

content.split(/\r?\n/).forEach((line) => {
    engineArray.push(line.split(''))
})

for (let r = 0; r < engineArray.length; r++) {
    const row = engineArray[r];
    for (let colum = 0; colum < row.length; colum++) {
        const element = row[colum];
       if(isDigit(element)) {
            currentNumber.push({val: element, symbolsAround: hasSymbolAround(engineArray, {x: r, y: colum}) })
       } else if(currentNumber.length > 0) {
            if(currentNumber.some((e) => e.symbolsAround)) {
            numbersWithWSymbolsAround.push(currentNumber.reduce((acc, cur) => acc + cur.val,""))
            }
            currentNumber = []
        }
    }

}

console.log(numbersWithWSymbolsAround.reduce((acc, cur) => acc + parseInt(cur), 0))
//console.table(engineArray)