'use strict'

const router = require('express').Router({ mergeParams: true })
const sensor = require('../controllers/sensor')

router.route('/sensores')
.get(sensor.getSensores)
.post(sensor.createSensor)

router.route('/read/:id')
.put(sensor.update)
.delete(sensor.delete)
.get(sensor.readSensor)

module.exports = router