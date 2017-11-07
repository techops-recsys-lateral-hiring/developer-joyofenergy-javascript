'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const server = express()
server.set('port', process.env.PORT || 8080);

server.use(bodyParser.json())

server.use('/readings', require('./controller/meter-reading-controller'))

let start = () => {
    server.listen(server.get('port'), function() {
        console.log(`router started on http://localhost:${server.get('port')}; press Ctrl-C to terminate.`)
    })
}

start()