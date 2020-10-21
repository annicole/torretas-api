'use strict'

const router = require('express').Router({ mergeParams: true });
const contemp = require('../controllers/contemp');
const auth = require('../middleware/auth');
const { ensureAuth } = auth;

router.route('/contemp')
    .get(ensureAuth, contemp.getContemp)
    .post(ensureAuth, contemp.create);

router.route('/read/:id')
    .put(ensureAuth, contemp.update)
    .delete(ensureAuth, contemp.delete)
    .get(ensureAuth, contemp.readContemp);


module.exports = router