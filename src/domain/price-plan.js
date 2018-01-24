'use strict'

class PricePlan {

    constructor(name, supplier, unitRate) {
        this.name = name
        this.supplier = supplier
        this.unitRate = unitRate        
    }

    getPrice(dateTime) {
        return this.unitRate;
    }
}

PricePlan.DayOfWeek = Object.freeze({
    Monday:1, 
    Tuesday:2, 
    Wednesday:3, 
    Thuesday:4, 
    Friday:5, 
    Saturday:6, 
    Sunday:7, 
})

PricePlan.PeakTimeMultiplier = class {
    constructor(dayOfWeek, multiplier) {

    }
}

module.exports = PricePlan