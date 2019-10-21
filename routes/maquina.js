'use strict'

const router = require('express').Router({ mergeParams: true });
const maquina = require('../controllers/maquina');
const auth = require('../middleware/auth');
const { ensureAuth } = auth;

router.route('/maquinas')
.get(maquina.getMaquinas,ensureAuth)
.post(maquina.createMaquina,ensureAuth);

router.route('/read/:id')
.put(maquina.update,ensureAuth)
.delete(maquina.delete,ensureAuth)
.get(maquina.readMaquina,ensureAuth);

module.exports = router