'use strict'

const express = require('express')
const router = express.Router()

router.get('/', function(req, res) {
    res.status(200).json({message: 'OK'})
})

module.exports = router

