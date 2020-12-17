'use strict'

const router = require('express').Router({ mergeParams: true })
const progprod = require('../controllers/progprod')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/get')
.post(ensureAuth,progprod.create);

router.route('/getprogprodf')
.get(ensureAuth,progprod.getprogprodf);

router.route('/getprogprodfprod')
.get(ensureAuth,progprod.getprogprodprod);

router.route('/getprogprodwo')
.get(ensureAuth,progprod.getprogprodwo);

router.route('/read/:id')
.delete(ensureAuth,progprod.delete);

router.route('/updateDown/:id')
.put(ensureAuth,progprod.updateDown);

router.route('/updateUp/:id')
.put(ensureAuth,progprod.updateUp)

module.exports = router