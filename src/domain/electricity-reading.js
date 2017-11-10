class ElectricityReading {

    constructor(json) {
        this.time = json.time
        this.reading = json.reading
    }

}

module.exports = ElectricityReading