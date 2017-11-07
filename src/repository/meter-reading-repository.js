'use strict'

class MeterReadingRepository {

    constructor() {
        this.meterAssociatedReadings = new Map()
    }

    store(smartMeterId, readings) {
        if (this.contains(smartMeterId)) {
            existingListOfReadings = this.meterAssociatedReadings.get(smartMeterId)
            this.meterAssociatedReadings.set(smartMeterId, readings.concat(existingListOfReadings))
        } else {
            this.meterAssociatedReadings.set(smartMeterId, readings)
        }
    }

    find(smartMeterId) {
        return this.meterAssociatedReadings.get(smartMeterId)
    }

    contains(smartMeterId) {
        return this.meterAssociatedReadings.get(smartMeterId) !== undefined
    }

}

module.exports = MeterReadingRepository