'use strict'

const express = require('express')
const router = express.Router()

router.post('/store', function(req, res) {
    res.status(200).json(req.body)
})

module.exports = router

