'use strict'

const express = require('express')
const router = express.Router()
const PricePlanService = require('../service/price-plan-service')
const AccountService = require('../service/account-service')

router.get('/compare-all/:smartMeterId', function(req, res) {
    const smartMeterId = req.params.smartMeterId
    const pricePlanService = new PricePlanService()
    const accountService = new AccountService();
    const listOfSpendAgainstPricePlans = pricePlanService.getListOfSpendAgainstEachPricePlanFor(smartMeterId)
    
    if (listOfSpendAgainstPricePlans.length < 1) {
        res.status(404).send(`No readings found for the smart meter ${smartMeterId}`)
    } else {
        let response = { 
            pricePlanId: accountService.getPricePlan(smartMeterId),
            pricePlanComparisons: listOfSpendAgainstPricePlans
        };
        res.status(200).send(response)
    }
})

router.get('/recommend/:smartMeterId', function(req, res) {
    const smartMeterId = req.params.smartMeterId
    const pricePlanService = new PricePlanService()
    const listOfSpendAgainstPricePlans = pricePlanService.getListOfSpendAgainstEachPricePlanFor(smartMeterId)
    res.status(200).send(listOfSpendAgainstPricePlans)    
})
module.exports = router