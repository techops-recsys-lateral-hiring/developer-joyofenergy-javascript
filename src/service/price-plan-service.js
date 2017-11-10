'use strict'

const ElectricityReadingService = require('./electricity-reading-service')
const ElectricityReading = require('../domain/electricity-reading')
const pricePlanRepository = require('../repository/price-plan-repository')

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
        return pricePlans.map(pricePlan => consumedEnergy * pricePlan.unitRate) 
    }

    calculateAverageReading(readings) {
        let sum = readings.map(r=>r.reading).reduce((p,c) => p+c, 0)
        return sum / readings.length                
    }

    calculateTimeElapsed(readings) {
        let min = Math.min.apply(null, readings.map(r=>r.time))
        let max = Math.max.apply(null, readings.map(r=>r.time))
        return (new Date(max-min)).getSeconds()/3600
    }
}

module.exports = PricePlanService