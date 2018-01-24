'use strict'

const chai = require('chai')
const expect = chai.expect
const PricePlan = require('../../src/domain/price-plan')

describe('Price Plan', function() {

    it('Should return the base price given an off peak date time', () => {
        let peakTimeMultiplier = new PricePlan.PeakTimeMultiplier(PricePlan.DayOfWeek.Wednesday, 10)
        let offPeakTime = new Date('Sat Jan 1 2000 11:11:11Z')

        let plan = new PricePlan('plan-name', 'supplier-name', 1, [ peakTimeMultiplier ])

        let price = plan.getPrice(offPeakTime)

        expect(price).to.equal(1);
    })

    it('Should return a peak price given a datetime matching peak day', () => {
        let peakTimeMultiplier = new PricePlan.PeakTimeMultiplier(PricePlan.DayOfWeek.Wednesday, 10)
        let peakTime = new Date('Wed Jan 5 2000 11:11:11Z')

        let plan = new PricePlan('plan-name', 'supplier-name', 1, [ peakTimeMultiplier ])

        let price = plan.getPrice(peakTime)

        expect(price).to.equal(10);
    })

})