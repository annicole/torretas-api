'use strict'

const router = require('express').Router({ mergeParams: true });
const cia = require('../controllers/cia');
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/cias')
.get(ensureAuth,cia.getCias)
.post(ensureAuth,cia.createCia);

router.route('/read/:id')
.get(ensureAuth,cia.readCia)
.put(ensureAuth,cia.update);

module.exports = router