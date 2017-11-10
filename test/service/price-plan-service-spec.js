'use strict'

const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const PricePlanService = require('../../src/service/price-plan-service')
const pricePlanRepository = require('../../src/repository/price-plan-repository')
const PricePlan = require('../../src/domain/price-plan')
const ElectricityReadingService = require('../../src/service/electricity-reading-service')
const ElectricityReading = require('../../src/domain/electricity-reading')

describe('Price Plan Service', function() {

    let pricePlanService = new PricePlanService()

    afterEach(() => {
        pricePlanRepository.clear()
    })

    it('Should calculate costs against all price plans', () => {
        pricePlanRepository.store([ new PricePlan('X1', 'XS1', 10),
                                    new PricePlan('X2', 'XS2', 2),
                                    new PricePlan('X6', 'XS6', 1) ])

        let readingServiceMock = sinon.mock(ElectricityReadingService.prototype)
        readingServiceMock.expects('retrieveReadingsFor').returns([new ElectricityReading({"time": 1510307115295, "reading": 0.5778640126312636}),
                                    new ElectricityReading({"time": 1510307125295, "reading": 0.19979840426464207}),
                                    new ElectricityReading({"time": 1510307135295, "reading": 0.22644598149484024}) ])

        let spend =  pricePlanService.getListOfSpendAgainstEachPricePlanFor('smart-meter-1001')
        expect(spend).to.include(602.4650390344476)
        expect(spend).to.include(120.49300780688952)
        expect(spend).to.include(60.24650390344476)
    })
})