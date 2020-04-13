'use strict'

const router = require('express').Router({ mergeParams: true });
const evento = require('../controllers/evento');
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/get')
.get(ensureAuth,evento.getEventos);

module.exports = router