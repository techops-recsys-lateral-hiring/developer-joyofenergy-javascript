'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const server = express()
server.set('port', process.env.PORT || 8080);

server.use(bodyParser.json())
server.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Internal server error')
})

server.use('/readings', require('./controller/electricity-reading-controller'))

let start = () => {
    server.listen(server.get('port'), function() {
        console.log(`router started on http://localhost:${server.get('port')}; press Ctrl-C to terminate.`)
    })
}

start()