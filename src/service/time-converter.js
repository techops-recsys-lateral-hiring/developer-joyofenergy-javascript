'use strict'

class TimeConverter {

    timeElapsedInHours(earliestUnixTimestamp, latestUnixTimestamp) {
        const elapsedUnixSeconds = latestUnixTimestamp - earliestUnixTimestamp;
        return elapsedUnixSeconds / 3600;
    }
}

module.exports = new TimeConverter()