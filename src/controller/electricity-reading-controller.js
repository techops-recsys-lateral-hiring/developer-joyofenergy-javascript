'use strict'

const express = require('express')
const router = express.Router()
const ElectricityReadingService = require('../service/electricity-reading-service')

router.post('/store', function(req, res) {
    let electricityReadingService = new ElectricityReadingService()
    electricityReadingService.storeReading(req.body)
    res.status(200).send(req.body)
})

module.exports = router

