'use strict'

const router = require('express').Router({ mergeParams: true })
const produccionlote = require('../controllers/produccionlote')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/getpro')
.get(ensureAuth,produccionlote.getpreparacion);

router.route('/get')
.get(ensureAuth,produccionlote.getlote)
.post(ensureAuth, produccionlote.create);

router.route('/read/:id')
.put(ensureAuth,produccionlote.update)
.delete(ensureAuth,produccionlote.delete);

module.exports = router