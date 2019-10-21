'use strict'

const router = require('express').Router({ mergeParams: true });
const cia = require('../controllers/cia');
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/cias')
.get(cia.getCias,ensureAuth)
.post(cia.createCia,ensureAuth);

router.route('/read/:id')
.get(cia.readCia,ensureAuth)
.put(cia.update,ensureAuth);

module.exports = router