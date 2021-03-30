'use strict'

const router = require('express').Router({ mergeParams: true })
const produccionlote = require('../controllers/produccionlote')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/get')
.get(ensureAuth,produccionlote.get)
.post(ensureAuth, produccionlote.create);

router.route('/read/:id')
.put(ensureAuth,produccionlote.update)
.get(ensureAuth,produccionlote.read)
.delete(ensureAuth,produccionlote.delete);

module.exports = router