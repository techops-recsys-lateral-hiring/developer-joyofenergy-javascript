'use strict'

const ElectricityReading = require('../domain/electricity-reading')

function randomIntBetween(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    //Maximum is exclusive and minimum is inclusive
    let random = Math.floor(Math.random() * (max-min)) + min
    return (Math.floor(random/10) > 0) ? random + '' : '0' + random
}

function generateElectricityReadings(num) {
    return (new Array(num).fill(1)).reduce((p, c) => {
        let randomTime = Date.parse(`2001-${randomIntBetween(1,12)}-${randomIntBetween(1,28)}T${randomIntBetween(0,23)}:${randomIntBetween(0,59)}:${randomIntBetween(0,59)}`) / 1000
        let randomReading = Math.floor(Math.random() * 1000)/1000;
        return p.concat(new ElectricityReading({time: randomTime, reading: randomReading}))
    }, []) 
}

function generateReadingsPerMeter(num) {
    Array.from({length: 10}, (v,k)=>k+1).forEach(index => {
        let smartMeterId = `smart-meter-${index}`
        electricityReadingService.storeReading({
            "smartMeterId": smartMeterId,
            "electricityReadings": [electricityReadings[index-1]]
        })    
    })
    
}

module.exports = generateElectricityReadings