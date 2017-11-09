'use strict'

const chai = require('chai')
const expect = chai.expect
const express = require('express')

chai.use(require('chai-http'))

describe('Root' , () => {
    let server
    beforeEach((next) => {
        server = express()
            .use('/', require('../../src/controller/root-controller'))
            .listen(next)
    })

    afterEach(() => {
        server.close()
    })

    it('Should return OK', () => {
        const port = server.address().port
        const agent = chai.request(`http://localhost:${port}`)

        return agent
            .get('/')
            .then((res) => {
                expect(res.status).to.equal(200)
                expect(res.get('Content-Type')).to.include('json')
                expect(res.body).to.deep.equal({message: "OK"})
            })
    })
})