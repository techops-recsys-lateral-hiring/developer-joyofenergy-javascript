'use strict'

const chai = require('chai')
const expect = chai.expect
const electricityReadingRepository = require('../../src/repository/electricity-reading-repository')
const ElectricityReading = require('../../src/domain/electricity-reading')

describe('Electricity Reading Repository', function() {

    before(() => {
        electricityReadingRepository.store('smart-meter-0', [
            new ElectricityReading({ time: 1507375234000, reading: 0.5 }),
            new ElectricityReading({ time: 1510053634000, reading: 0.75 }),
        ])
    })

    it('Should have new entry when new smart meter id is given', function() {
        let readings = electricityReadingRepository.find('smart-meter-0')
        expect(readings.length).to.eq(2)
        expect(readings[0]).to.deep.equal({ time: 1507375234000, reading: 0.5 })
        expect(readings[1]).to.deep.equal({ time: 1510053634000, reading: 0.75 })
    })

    it('Should add usage data against smart meter id if it already exists', function() {
        electricityReadingRepository.store('smart-meter-0', 
            [new ElectricityReading({time: 1510572000000, reading: 0.32})])
        let readings = electricityReadingRepository.find('smart-meter-0')
        expect(readings.length).to.eq(3)
        expect(readings).to.deep.include(new ElectricityReading({ time: 1507375234000, reading: 0.5 }))
        expect(readings).to.deep.include(new ElectricityReading({ time: 1510053634000, reading: 0.75 }))
        expect(readings).to.deep.include(new ElectricityReading({ time: 1510572000000, reading: 0.32 }))
    })
    
})