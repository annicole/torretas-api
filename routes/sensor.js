'use strict'

const router = require('express').Router({ mergeParams: true })
const sensor = require('../controllers/sensor')

router.route('/sensores')
.get(sensor.getSensores)
.post(sensor.createSensor)

module.exports = router