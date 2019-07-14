'use strict'

const router = require('express').Router({ mergeParams: true })
const e1 = require('../controllers/evento1')
const e2 = require('../controllers/evento2')
const e3 = require('../controllers/evento3')
const e4 = require('../controllers/evento4')
const e5 = require('../controllers/evento5')
const e6 = require('../controllers/evento6')
const e7 = require('../controllers/evento7')
const e8 = require('../controllers/evento8')

router.route('/e1')
.get(e1.getEventos)

router.route('/e2')
.get(e2.getEventos)

router.route('/e3')
.get(e3.getEventos)

router.route('/e4')
.get(e4.getEventos)

router.route('/e5')
.get(e5.getEventos)

router.route('/e6')
.get(e6.getEventos)

router.route('/e7')
.get(e7.getEventos)

router.route('/e8')
.get(e8.getEventos)

module.exports = router