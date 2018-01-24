'use strict'

class PricePlan {

    constructor(name, supplier, unitRate, peakTimeMultipliers) {
        this.name = name
        this.supplier = supplier
        this.unitRate = unitRate
        this.peakTimeMultipliers = peakTimeMultipliers
    }

    getPrice(dateTime) {
        let rate = this.unitRate
        this.peakTimeMultipliers.forEach(peakTimeMultiplier => {
            if (peakTimeMultiplier.day === dateTime.getDay()) {
                rate = peakTimeMultiplier.multiplier;
            }
        });
        return rate
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