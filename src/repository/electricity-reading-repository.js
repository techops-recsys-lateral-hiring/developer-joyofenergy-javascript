'use strict'

class ElectricityReadingRepository {

    constructor() {
        this.meterAssociatedReadings = new Map()
    }

    store(smartMeterId, readings) {
        if (this.meterAssociatedReadings.has(smartMeterId)) {
            let existingListOfReadings = this.meterAssociatedReadings.get(smartMeterId)
            this.meterAssociatedReadings.set(smartMeterId, readings.concat(existingListOfReadings))
        } else {
            this.meterAssociatedReadings.set(smartMeterId, readings)
        }
    }

    find(smartMeterId) {
        if (this.meterAssociatedReadings.has(smartMeterId)) {
            return this.meterAssociatedReadings.get(smartMeterId)
        } else {
            return []
        }        
    }

}

module.exports = new ElectricityReadingRepository()