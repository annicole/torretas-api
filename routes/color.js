'use strict'

const router = require('express').Router({ mergeParams: true });
const color = require('../controllers/color');
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/colores')
.get(ensureAuth,color.getColores)
.post(ensureAuth,color.createColor);

module.exports = router