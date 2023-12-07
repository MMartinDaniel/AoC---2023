const {readFileSync } = require('fs');
const content = readFileSync("./input.txt", 'utf-8');

const isDigit = (e) => e.match(/\d/g)
const isGear = (g) => g.match(/\*/g) 

const findDigitsAround = (arr, position) => {
    const numbersAround = []
    for (let r = position.x-1; r <= position.x + 1; r++) {
        const row = arr[r];
        if(row) {
            for (let column = position.y -1; column <= position.y +1; column++) {
                const element = row[column]
                if(element && isDigit(element))numbersAround.push({val: element, x: r, y: column })
            }
        }
    }
    return numbersAround
}

const engineArray = []

content.split(/\r?\n/).forEach((line) => {
    engineArray.push(line.split(''))
})


const findFullNumber = (arr, digit) => {
   let number = digit.val
    let fromLeft = digit.y - 1
    let fromRight = digit.y + 1
    let foundLeft = false
    let foundRight = false
    
    while(!foundLeft) {
        const prevVal = arr[digit.x][fromLeft]
        if(!prevVal || !isDigit(prevVal)) {
            foundLeft = true
        } else { 
            number = `${prevVal}${number}` 
            fromLeft--;
        }
    }
    while(!foundRight) {
        const nextVal = arr[digit.x][fromRight]
        if(!nextVal || !isDigit(nextVal)) {
            foundRight = true
        } else { 
            number = `${number}${nextVal}` 
            fromRight++;
        }
    }
    return number
}

const gears = []
for (let r = 0; r < engineArray.length; r++) {
    const row = engineArray[r];
    for (let colum = 0; colum < row.length; colum++) {
        const element = row[colum];
       if(isGear(element)) {
            const digitsAround = findDigitsAround(engineArray, {x: r, y: colum})
            // ignore the ones that are not alone
            if(digitsAround.length > 1) {
                const gearNumbers = [...new Set(digitsAround.map((digit) => findFullNumber(engineArray, digit)))]
                if (gearNumbers.length > 1) {
                    gears.push(gearNumbers.reduce((acc, cur) => cur * acc, 1))
                }
            }           
       }
    }

}
console.log(gears.reduce((acc, cur) => cur + acc,0))