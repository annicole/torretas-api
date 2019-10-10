'use strict'

const router = require('express').Router({ mergeParams: true })
const area = require('../controllers/area')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/areas')
.get(area.getAreas,ensureAuth)
.post(area.createArea,ensureAuth);

router.route('/read/:id')
.put(area.update,ensureAuth)
.delete(area.delete,ensureAuth)
.get(area.readArea,ensureAuth)

module.exports = router