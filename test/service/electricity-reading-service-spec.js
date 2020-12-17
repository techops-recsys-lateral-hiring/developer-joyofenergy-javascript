'use strict'

const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const ElectricityReadingService = require('../../src/service/electricity-reading-service')
const electricityReadingRepository =  require('../../src/repository/electricity-reading-repository')
const ElectricityReading = require('../../src/domain/electricity-reading')
const InvalidJsonException = require('../../src/service/invalid-json-exception')

describe('Electricity Reading Service', function() {

    let electricityReadingService = new ElectricityReadingService()

    it('Should call repository to store readings', function() {
        let json = {
            "smartMeterId": "smart-meter-45",
            "electricityReadings": [
                { "time": Date.parse('2015-03-02T08:55:00'), "reading": 0.812 },
                { "time": Date.parse('2015-09-02T08:55:00'), "reading": 0.23 }                
            ]
        }

        let repoMock = sinon.mock(electricityReadingRepository, 'store')
        repoMock.expects('store').withArgs('smart-meter-45', [
            new ElectricityReading({ "time": Date.parse('2015-03-02T08:55:00'), "reading": 0.812 }),
            new ElectricityReading({ "time": Date.parse('2015-09-02T08:55:00'), "reading": 0.23 })
        ])

        electricityReadingService.storeReading(json)
        repoMock.verify()
    })

    // JSON validation tests
    let jsonToErrors = new Map()
    let emptyJson = {}
    jsonToErrors.set(emptyJson, ['should have required property \'smartMeterId\'', 'should have required property \'electricityReadings\''])

    let emptyReadingsJson = {
        "smartMeterId": "smart-meter-34",
        "electricityReadings": []
    }    
    jsonToErrors.set(emptyReadingsJson, ['should NOT have fewer than 1 items'])

    let incorrectMeterIdJson = {
        "smartMeterId": 23,
        "electricityReadings": [{"time": Date.parse('2015-03-02T08:55:00'), "reading": 0.9}]        
    }
    jsonToErrors.set(incorrectMeterIdJson, ['should be string'])

    let incorrectElectricityReadingsJson = {
        "smartMeterId": "smart-meter-34",
        "electricityReadings": [{"yer": "whatwhat"}]        
    }    
    jsonToErrors.set(incorrectElectricityReadingsJson, ['should have required property \'time\'', 'should have required property \'reading\''])

    let onlyTimeReadingsJson = {
        "smartMeterId": "smart-meter-34",
        "electricityReadings": [{"time": Date.parse('2015-03-02T08:55:00')}]        
    }    
    jsonToErrors.set(onlyTimeReadingsJson, ['should have required property \'reading\''])

    jsonToErrors.forEach((error, json) => {
        it('Should throws exception when invalid json sent', function() {
            try {
                expect(electricityReadingService.storeReading(json)).to.throw(InvalidJsonException)
            } catch (e) { 
                if (e.name !== 'InvalidJsonException') throw e
                else {
                    expect(e.message.map(dm => dm.message)).to.deep.eq(error)
                }
            }
        })    
    })
    
    
})