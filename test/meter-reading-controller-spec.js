'use strict'

const chai = require('chai')
const expect = chai.expect
const express = require('express')
const bodyParser = require('body-parser')

chai.use(require('chai-http'))

describe('Meter reading controller' , () => {
    let server
    beforeEach((next) => {
        server = express()
            .use(bodyParser.json())
            .use('/readings', require('../src/controller/meter-reading-controller'))
            .listen(next)
    })

    afterEach(() => {
        server.close()
    })

    it('should return same json posted', () => {
        const port = server.address().port
        const agent = chai.request(`http://localhost:${port}`)

        const readingJson = {
            "meterId": "meter-11",
            "electricityReadings": [
                { "time": 1505825656838, "reading": 0.6 }
            ]
        }

        return agent
            .post('/readings/store')
            .send(readingJson)
            .then((res) => {
                expect(res.status).to.equal(200)
                expect(res.get('Content-Type')).to.include('json')
                expect(res.body).to.deep.equal(readingJson)
            })
    })
})