class ElectricityReading {

    constructor(json) {
        this.time = json.time
        this.reading = json.reading
    }

    getTime() {
        return this.time
    }

    getReading() {
        return this.reading
    }

}

module.exports = ElectricityReading