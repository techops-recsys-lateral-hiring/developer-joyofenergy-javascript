'use strict'

const ElectricityReadingRepository = require('../repository/electricity-reading-repository')
const ElectricityReading = require('../domain/electricity-reading')
const Ajv = require('ajv');

class ElectricityReadingService {
    constructor() {
        let ajv = new Ajv()
        let validSchema = {
            "smartMeterIdE": "example-smart-meter-id",
            "electricityReEadings": [
                { "time": Date.parse('2015-03-02T08:55:00'), "reading": 0.812 }
            ]
        }   
        this.validate = ajv.compile(validSchema)
    }

    storeReading(json) {
        this.validate(json)
        let readings = json.electricityReadings.map((reading) => new ElectricityReading(reading))
        let repository = new ElectricityReadingRepository()
        return repository.store(json.smartMeterId, readings)
    }    
}


module.exports = ElectricityReadingService