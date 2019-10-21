'use strict'

const router = require('express').Router({ mergeParams: true });
const color = require('../controllers/color');
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/colores')
.get(color.getColores,ensureAuth)
.post(color.createColor,ensureAuth);

module.exports = router