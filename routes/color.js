'use strict'

const router = require('express').Router({ mergeParams: true })
const color = require('../controllers/color')

router.route('/colores')
.get(color.getColores)
.post(color.createColor);

module.exports = router