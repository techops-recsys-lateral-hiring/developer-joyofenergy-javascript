'use strict'

class InvalidJsonException {

    constructor(message) { 
        this.message = message
        this.name = 'InvalidJsonException'
    }

}

module.exports = InvalidJsonException