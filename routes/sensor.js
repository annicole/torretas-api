'use strict'

const router = require('express').Router({ mergeParams: true });
const sensor = require('../controllers/sensor');

const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/sensores')
.get(sensor.getSensores,ensureAuth)
.post(sensor.createSensor,ensureAuth)

router.route('/read/:id')
.put(sensor.update,ensureAuth)
.delete(sensor.delete,ensureAuth)
.get(sensor.readSensor,ensureAuth)

module.exports = router