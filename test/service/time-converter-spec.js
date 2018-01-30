'use strict'

const chai = require('chai')
const expect = chai.expect
const TimeConverter = require('../../src/service/time-converter')

describe('Time Converter', function() {

    it('Should calculate elapsed time in hours from two unix timestamps', () => {
        let earlier = unixTimeOf('May 24 2018 11:00:00Z')
        let later =   unixTimeOf('May 24 2018 12:00:00Z')

        expect(TimeConverter.timeElapsedInHours(earlier, later)).to.eql(1)
    })

    let unixTimeOf = function(dateSpec) {
        return Math.floor(new Date(dateSpec) / 1000);
     } 
})