'use strict'

class AccountService {

    constructor() {
        this.planIdsByMeter = {
            "meter-0": "price-plan-0",
            "meter-1": "price-plan-1",
            "meter-2": "price-plan-0",
            "meter-3": "price-plan-2",
            "meter-4": "price-plan-1",
        }
    }

    getPricePlan(smartMeterId) {
        return this.planIdsByMeter[smartMeterId]
    }
}

module.exports = AccountService