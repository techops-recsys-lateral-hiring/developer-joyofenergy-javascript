'use strict'

const ElectricityReadingService = require('./electricity-reading-service')
const ElectricityReading = require('../domain/electricity-reading')
const pricePlanRepository = require('../repository/price-plan-repository')
const TimeConverter = require('../service/time-converter')

class PricePlanService {

    constructor() {
        this.electricityReadingService = new ElectricityReadingService()
    }

    getListOfSpendAgainstEachPricePlanFor(smartMeterId) {
        let readings = this.electricityReadingService.retrieveReadingsFor(smartMeterId)
        if (readings.length < 1) return []
        let average = this.calculateAverageReading(readings)
        let timeElapsed = this.calculateTimeElapsed(readings)
        let consumedEnergy = average/timeElapsed

        let pricePlans = pricePlanRepository.get()
        return this.cheapestPlansFirst(pricePlans).map(pricePlan => {
            let cost = {}
            cost[pricePlan.name] = consumedEnergy * pricePlan.unitRate
            return cost;
        })
    }

    cheapestPlansFirst(pricePlans) {
        return pricePlans.sort((planA, planB) => planA.unitRate - planB.unitRate)
    }

    calculateAverageReading(readings) {
        let sum = readings.map(r=>r.reading).reduce((p,c) => p+c, 0)
        return sum / readings.length                
    }

    calculateTimeElapsed(readings) {
        let min = Math.min.apply(null, readings.map(r=>r.time))
        let max = Math.max.apply(null, readings.map(r=>r.time))
        return TimeConverter.timeElapsedInHours(min, max);
    }
}

module.exports = PricePlanService