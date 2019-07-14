'use strict'

const router = require('express').Router({ mergeParams: true })
const area = require('../controllers/area')

router.route('/areas')
.get(area.getAreas)
.post(area.createArea);

module.exports = router