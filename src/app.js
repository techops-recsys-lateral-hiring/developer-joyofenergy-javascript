'use strict'

const express = require('express')
const rootController = require('./root-controller')

const server = express()

server.use('/', rootController)
server.set('port', process.env.PORT || 8080);

let start = () => {
    server.listen(server.get('port'), function() {
        console.log(`router started on http://localhost:${server.get('port')}; press Ctrl-C to terminate.`)
    })
}

start()