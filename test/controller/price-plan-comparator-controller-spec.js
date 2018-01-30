'use strict'

const chai = require('chai')
const expect = chai.expect
const express = require('express')
const bodyParser = require('body-parser')
const initializeData = require('../../src/app-initializer')
const pricePlanRepository = require('../../src/repository/price-plan-repository')
const ElectricityReading = require('../../src/domain/electricity-reading')

chai.use(require('chai-http'))

describe('Price plan comparator controller' , () => {
    let server
    beforeEach((next) => {
        server = express()
            .use(bodyParser.json())
            .use('/readings', require('../../src/controller/electricity-reading-controller'))
            .use('/price-plans', require('../../src/controller/price-plan-comparator-controller'))
            .listen(() => {
                initializeData()
                return next()
            })
    })

    afterEach(() => {
        pricePlanRepository.clear()
        server.close()
    })

    it ('Should get costs against all price plans', () => {
        const port = server.address().port
        const agent = chai.request(`http://localhost:${port}`)

        return agent
            .get('/price-plans/compare-all/meter1')
            .then((res) => {
                expect(res.status).to.equal(200)
                expect(res.body.length).to.equal(3)
            })
    
    })

    it ('Should recommend cheapest price plans no limit for meter usage', () => {
        const port = server.address().port
        const agent = chai.request(`http://localhost:${port}`)

        const readings = [
            { "time": unixTimeOf('Jan 5 2020 10:30:00Z'), "reading": 35 },
            { "time": unixTimeOf('Jan 5 2020 11:00:00Z'), "reading": 3 }
        ];

        const readingJson = {
            "smartMeterId": "meter-103",
            "electricityReadings": readings
        }

        return agent.post('/readings/store').send(readingJson).then((res) => {
            return agent.get('/price-plans/recommend/meter-103').then((res) => {
                expect(res.status).to.equal(200)
                expect(res.body).to.eql([
                    { "price-plan-2": 38 },
                    { "price-plan-1": 76 },
                    { "price-plan-0": 380 }
                ])
            })
        })
    
    })

    let unixTimeOf = function(dateSpec) {
        return Math.floor(new Date(dateSpec) / 1000);
    }

})