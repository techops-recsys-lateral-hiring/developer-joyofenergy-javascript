'use strict'

const chai = require('chai')
const expect = chai.expect
const rewire = require('rewire')
const electricityReadingGenerator = rewire('../../src/generator/electricity-reading-generator')

describe('Electricity Reading Generator', function() {

    it('Should generate electricity readings', function() {
        let generator = electricityReadingGenerator.__get__('generateElectricityReadings')
        let generated = generator(10)
        expect(generated.length).to.eq(10)
        for (let i = 0; i < 10; i++) {
            expect(new Date(generated[i].time * 1000).getFullYear()).to.eq(2001)
            expect(generated[i].reading).to.be.above(0)
            expect(generated[i].reading).to.be.below(1)
        }
    })

    it('Should return two digit number for single digit number', function() {
        Math.random = () => 9
        let randomfn = electricityReadingGenerator.__get__('randomIntBetween')
        expect(randomfn(0, 1)).to.eq('09')
    })

    it('Should return two digit number for two digit number', function() {
        Math.random = () => 11
        let randomfn = electricityReadingGenerator.__get__('randomIntBetween')
        expect(randomfn(0, 1)).to.eq('11')
    })    
})