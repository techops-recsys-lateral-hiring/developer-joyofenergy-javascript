'use strict'

const ElectricityReadingRepository = require('../repository/electricity-reading-repository')
const ElectricityReading = require('../domain/electricity-reading')
const Ajv = require('ajv');
const InvalidJsonException = require('./invalid-json-exception')

class ElectricityReadingService {
    constructor() {
        this.ajv = new Ajv({v5: true, allErrors: true})
        this.validSchema =   {
            "type": "object", 
            "properties": {
              "smartMeterId": {
                "type": "string", 
              }, 
              "electricityReadings": {
                "type": "array", 
                "items": {
                  "type": "object", 
                  "properties": {
                    "time": {
                      "type": "integer", 
                    },
                    "reading": {
                        "type": "number"
                    }
                  },
                  "required": ["time", "reading"]
                },
                "minItems": 1
              }
            },
            "required": ["smartMeterId", "electricityReadings"]
          }
    }

    storeReading(json) {
        let validJson = this.ajv.validate(this.validSchema, json)
        if (!validJson) {
            throw new InvalidJsonException(this.ajv.errors)
        }
        let readings = json.electricityReadings.map((reading) => new ElectricityReading(reading))
        let repository = new ElectricityReadingRepository()
        return repository.store(json.smartMeterId, readings)
    }  
    
}

module.exports = ElectricityReadingService