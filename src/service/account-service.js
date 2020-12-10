'use strict'

class AccountService {

    constructor() {
        this.planIdsByMeter = {
            "smart-meter-0": "price-plan-0",
            "smart-meter-1": "price-plan-1",
            "smart-meter-2": "price-plan-0",
            "smart-meter-3": "price-plan-2",
            "smart-meter-4": "price-plan-1",
        }
    }

    getPricePlan(smartMeterId) {
        return this.planIdsByMeter[smartMeterId]
    }
}

module.exports = AccountService