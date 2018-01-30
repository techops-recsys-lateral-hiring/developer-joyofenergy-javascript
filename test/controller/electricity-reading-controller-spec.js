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
                { "time": 1505825656, "reading": 0.6 }
            ]
        }

        return agent
            .post('/readings/store')
            .send(readingJson)
            .then((res) => {
                expect(res.status).to.equal(200)
            })
    
    })

    it ('Should successfully add the reading against existing smart meter id', () => {
        const port = server.address().port
        const agent = chai.request(`http://localhost:${port}`)  

        const readingJson1 = {
            "smartMeterId": "meter-100",
            "electricityReadings": [
                { "time": 1505825838, "reading": 0.6 },
                { "time": 1505825848, "reading": 0.65 },
            ]
        }

        const readingJson2 = {
            "smartMeterId": "meter-100",
            "electricityReadings": [
                { "time": 1605825849, "reading": 0.7 }
            ]
        }

        return agent.post('/readings/store').send(readingJson1)
            .then((res) => {
                return agent.post('/readings/store').send(readingJson2)
                    .then(res =>  {
                        return agent.get('/readings/read/meter-100')
                            .then(res => {
                                expect(res.status).to.equal(200)
                                expect(res.body.length).to.equal(3)
                                expect(res.body).to.deep.include({ "time": 1505825838, "reading": 0.6 })
                                expect(res.body).to.deep.include({ "time": 1505825848, "reading": 0.65 })
                                expect(res.body).to.deep.include({ "time": 1605825849, "reading": 0.7 })
                            })
                    })
            })
    })    

    it ('Should respond with error if smart meter id not set', () => {
        const port = server.address().port
        const agent = chai.request(`http://localhost:${port}`)

        const readingJson = {
            "electricityReadings": [
                { "time": 1505825838, "reading": 0.6 }
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