'use strict'

const router = require('express').Router({ mergeParams: true })
const diaturno = require('../controllers/diaturno')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/get')
    .get(ensureAuth,diaturno.get)
    .post(ensureAuth, diaturno.create);

router.route('/read/:id')
    .put(ensureAuth, diaturno.update)
    .get(ensureAuth, diaturno.read)
    .delete(ensureAuth, diaturno.delete);

module.exports = router