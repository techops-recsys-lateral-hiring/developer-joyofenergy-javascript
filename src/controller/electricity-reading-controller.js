'use strict'

const express = require('express')
const router = express.Router()
const ElectricityReadingService = require('../service/electricity-reading-service')
const InvalidJsonException = require('../service/invalid-json-exception')

router.post('/store', function(req, res) {
    let electricityReadingService = new ElectricityReadingService()
    try {
        electricityReadingService.storeReading(req.body)
        res.status(200).send(req.body)
    } catch (e) {
        res.status(500).send(e)        
    }
})

module.exports = router