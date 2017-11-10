'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const generateElectricityReadings = require('./generator/electricity-reading-generator')
const ElectricityReadingService = require('./service/electricity-reading-service')
const server = express()
server.set('port', process.env.PORT || 8080);

server.use(bodyParser.json())
server.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Internal server error')
})

server.use('/readings', require('./controller/electricity-reading-controller'))

const initializeData = () => {
    let electricityReadingService = new ElectricityReadingService()
    Array.from({length: 10}, (v,k)=>k+1).forEach(index => {
        let smartMeterId = `meter${index}`
        electricityReadingService.storeReading({
            "smartMeterId": smartMeterId,
            "electricityReadings": generateElectricityReadings(5)
        })    
    })
}

let start = () => {
    server.listen(server.get('port'), function() {
        initializeData()
        console.log(`router started on http://localhost:${server.get('port')}; press Ctrl-C to terminate.`)
    })
}

start()