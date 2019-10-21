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
const auth = require('../middleware/auth');
const { ensureAuth } = auth;

router.route('/e1',ensureAuth)
.get(e1.getEventos);

router.route('/e2',ensureAuth)
.get(e2.getEventos);

router.route('/e3',ensureAuth)
.get(e3.getEventos);

router.route('/e4',ensureAuth)
.get(e4.getEventos);

router.route('/e5',ensureAuth)
.get(e5.getEventos);

router.route('/e6',ensureAuth)
.get(e6.getEventos)

router.route('/e7',ensureAuth)
.get(e7.getEventos);

router.route('/e8',ensureAuth)
.get(e8.getEventos);

module.exports = router