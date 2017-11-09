'use strict'

const sinon = require('sinon')
const ElectricityReadingService = require('../../src/service/electricity-reading-service')
const ElectricityReadingRepository = require('../../src/repository/electricity-reading-repository')
const ElectricityReading = require('../../src/domain/electricity-reading')

describe('Electricity Reading Service', function() {

    let electricityReadingService = new ElectricityReadingService()

    it('Should call repository to store readings', function() {
        let json = {
            "smartMeterId": "meter-45",
            "electricityReadings": [
                { "time": Date.parse('2015-03-02T08:55:00'), "reading": 0.812 },
                { "time": Date.parse('2015-09-02T08:55:00'), "reading": 0.23 }
            ]
        }

        let repoMock = sinon.mock(ElectricityReadingRepository.prototype, 'store')
        repoMock.expects('store').withArgs('meter-45', [
            new ElectricityReading({ "time": Date.parse('2015-03-02T08:55:00'), "reading": 0.812 }),
            new ElectricityReading({ "time": Date.parse('2015-09-02T08:55:00'), "reading": 0.23 })
        ])

        electricityReadingService.storeReading(json)
        repoMock.verify()
    })

    
})