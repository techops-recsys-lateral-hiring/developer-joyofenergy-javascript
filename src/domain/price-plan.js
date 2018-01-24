'use strict'

class PricePlan {

    constructor(name, supplier, unitRate, peakTimeMultipliers) {
        this.name = name
        this.supplier = supplier
        this.unitRate = unitRate
        this.peakTimeMultipliers = peakTimeMultipliers
    }

    getPrice(dateTime) {
        let peakMultiplier = this.peakTimeMultipliers.find(multiplier => {
            return multiplier.day === dateTime.getDay()
        });
        return peakMultiplier ? peakMultiplier.multiplier : this.unitRate;
    }
}

PricePlan.DayOfWeek = Object.freeze({
    Sunday:0,
    Monday:1, 
    Tuesday:2, 
    Wednesday:3, 
    Thuesday:4, 
    Friday:5, 
    Saturday:6
})

PricePlan.PeakTimeMultiplier = class {
    constructor(dayOfWeek, multiplier) {
        this.day = dayOfWeek
        this.multiplier = multiplier
    }
}

module.exports = PricePlan