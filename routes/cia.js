'use strict'

const router = require('express').Router({ mergeParams: true })
const cia = require('../controllers/cia')

router.route('/cias')
.get(cia.getCias)
.post(cia.createCia);

router.route('/read/:id')
.get(cia.readCia)
.put(cia.update);

module.exports = router