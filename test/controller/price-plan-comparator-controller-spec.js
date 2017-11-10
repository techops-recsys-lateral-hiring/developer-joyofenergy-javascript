'use strict'

const chai = require('chai')
const expect = chai.expect
const express = require('express')
const bodyParser = require('body-parser')
const initializeData = require('../../src/app-initializer')
const pricePlanRepository = require('../../src/repository/price-plan-repository')

chai.use(require('chai-http'))

describe('Price plan comparator controller' , () => {
    let server
    beforeEach((next) => {
        server = express()
            .use(bodyParser.json())
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

})