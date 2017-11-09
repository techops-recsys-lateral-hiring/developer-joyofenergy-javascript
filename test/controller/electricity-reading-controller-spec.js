'use strict'

const chai = require('chai')
const expect = chai.expect
const express = require('express')
const bodyParser = require('body-parser')

chai.use(require('chai-http'))

describe('Electricity reading controller' , () => {
    let server
    beforeEach((next) => {
        server = express()
            .use(bodyParser.json())
            .use('/readings', require('../../src/controller/electricity-reading-controller'))
            .listen(next)
    })

    afterEach(() => {
        server.close()
    })

    it ('Should successfully add the reading against new smart meter id', () => {
        const port = server.address().port
        const agent = chai.request(`http://localhost:${port}`)

        const readingJson = {
            "smartMeterId": "meter-11",
            "electricityReadings": [
                { "time": 1505825656838, "reading": 0.6 }
            ]
        }

        return agent
            .post('/readings/store')
            .send(readingJson)
            .then((res) => {
                expect(res.status).to.equal(200)
            })
    
    })

    it ('Should respond with error if smart meter id not set', () => {
        const port = server.address().port
        const agent = chai.request(`http://localhost:${port}`)

        const readingJson = {
            "electricityReadings": [
                { "time": 1505825656838, "reading": 0.6 }
            ]
        }

        return agent
            .post('/readings/store')
            .send(readingJson)
            .catch((res) => {
                expect(res.status).to.equal(500)
            })
    
    })

    it ('Should respond with error if electricity readings not set', () => {
        const port = server.address().port
        const agent = chai.request(`http://localhost:${port}`)

        const readingJson = {
            "smartMeterId": "meter-11"
        }

        return agent
            .post('/readings/store')
            .send(readingJson)
            .catch((res) => {
                expect(res.status).to.equal(500)
            })
    
    })
    

})