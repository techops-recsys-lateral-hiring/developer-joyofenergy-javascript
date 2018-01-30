'use strict'

const express = require('express')
const router = express.Router()
const PricePlanService = require('../service/price-plan-service')

router.get('/compare-all/:smartMeterId', function(req, res) {
    const smartMeterId = req.params.smartMeterId
    const pricePlanService = new PricePlanService()
    const listOfSpendAgainstPricePlans = pricePlanService.getListOfSpendAgainstEachPricePlanFor(smartMeterId)
    
    if (listOfSpendAgainstPricePlans.length < 1) {
        res.status(404).send(`No readings found for the smart meter ${smartMeterId}`)
    } else {
        res.status(200).send(listOfSpendAgainstPricePlans)
    }
})

router.get('/recommend/:smartMeterId', function(req, res) {
    const smartMeterId = req.params.smartMeterId
    const pricePlanService = new PricePlanService()
    const listOfSpendAgainstPricePlans = pricePlanService.getListOfSpendAgainstEachPricePlanFor(smartMeterId)
    res.status(200).send(listOfSpendAgainstPricePlans)    
})
module.exports = router