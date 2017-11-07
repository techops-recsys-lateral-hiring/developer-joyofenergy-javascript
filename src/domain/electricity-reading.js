class ElectricityReading {

    constructor(time, reading) {
        this.time = time
        this.reading = reading
    }

    getTime() {
        return this.time
    }

    getReading() {
        return this.reading
    }

}

module.exports = ElectricityReading