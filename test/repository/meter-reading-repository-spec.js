'use strict'

const chai = require('chai')
const expect = chai.expect
const MeterReadingRepository = require('../../src/repository/meter-reading-repository')
const ElectricityReading = require('../../src/domain/electricity-reading')

describe('Meter Reading Repository', function() {

    let meterReadingRepository = new MeterReadingRepository()

    before(() => {
        meterReadingRepository.store('smart-meter-0', [
            new ElectricityReading(1507375234000, 0.5),
            new ElectricityReading(1510053634000, 0.75),
        ])
    })

    it('Should have new entry when new smart meter id is given', function() {
        let readings = meterReadingRepository.find('smart-meter-0')
        expect(readings.length).to.eq(2)
        expect(readings[0]).to.deep.equal({ time: 1507375234000, reading: 0.5 })
        expect(readings[1]).to.deep.equal({ time: 1510053634000, reading: 0.75 })
    })

})