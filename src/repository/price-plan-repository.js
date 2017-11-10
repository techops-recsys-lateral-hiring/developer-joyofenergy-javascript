'use strict'

class PricePlanRepository {

    constructor() {
        this.pricePlans = []
    }

    store(newPricePlans) {
        this.pricePlans.push(...newPricePlans)
    }

    get() {
        return this.pricePlans.slice()
    }

    clear() {
        this.pricePlans = []
    }

}

module.exports = new PricePlanRepository()