'use strict'

const router = require('express').Router({ mergeParams: true })
const area = require('../controllers/area')

router.route('/areas')
.get(area.getAreas)
.post(area.createArea);

router.route('/read/:id')
.put(area.update)
.delete(area.delete)
.get(area.readArea)

module.exports = router