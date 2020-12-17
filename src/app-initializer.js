'use strict'

const generateElectricityReadings = require('./generator/electricity-reading-generator')
const ElectricityReadingService = require('./service/electricity-reading-service')
const pricePlanRepository = require('./repository/price-plan-repository')
const PricePlan = require('./domain/price-plan')

const DR_EVILS_DARK_ENERGY_ENERGY_SUPPLIER = "Dr Evil's Dark Energy";
const THE_GREEN_ECO_ENERGY_SUPPLIER = "The Green Eco";
const POWER_FOR_EVERYONE_ENERGY_SUPPLIER = "Power for Everyone";

const MOST_EVIL_PRICE_PLAN_ID = "price-plan-0";
const RENEWABLES_PRICE_PLAN_ID = "price-plan-1";
const STANDARD_PRICE_PLAN_ID = "price-plan-2";

const NUM_METERS = 10
const NUM_READINGS_AGAINST_METER = 5

const populateRandomElectricityReadings = () => {
    let electricityReadingService = new ElectricityReadingService()
    Array.from({length: NUM_METERS}, (v,k)=>k+1).forEach(index => {
        let smartMeterId = `smart-meter-${index - 1}`
        electricityReadingService.storeReading({
            "smartMeterId": smartMeterId,
            "electricityReadings": generateElectricityReadings(NUM_READINGS_AGAINST_METER)
        })    
    })
}

const populatePricePlans = () => {
    let pricePlans = [
        new PricePlan(MOST_EVIL_PRICE_PLAN_ID, DR_EVILS_DARK_ENERGY_ENERGY_SUPPLIER, 10),
        new PricePlan(RENEWABLES_PRICE_PLAN_ID, THE_GREEN_ECO_ENERGY_SUPPLIER, 2),
        new PricePlan(STANDARD_PRICE_PLAN_ID, POWER_FOR_EVERYONE_ENERGY_SUPPLIER, 1)
    ]
    pricePlanRepository.store(pricePlans)    
}

const initializeData = () => {
    populateRandomElectricityReadings()
    populatePricePlans()
}

module.exports = initializeData