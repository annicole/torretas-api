'use strict'

const router = require('express').Router({ mergeParams: true })
const sku = require('../controllers/skuMaquina')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/get')
.get(ensureAuth,sku.get)
.post(ensureAuth,sku.create);

router.route('/read/:id')
.put(ensureAuth,sku.update)
.get(ensureAuth,sku.read)
.delete(ensureAuth,sku.delete);

module.exports = router