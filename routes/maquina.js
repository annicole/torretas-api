'use strict'

const router = require('express').Router({ mergeParams: true });
const maquina = require('../controllers/maquina');
const auth = require('../middleware/auth');
const { ensureAuth } = auth;

router.route('/maquinas')
.get(ensureAuth,maquina.getMaquinas)
.post(maquina.createMaquina,ensureAuth);

router.route('/read/:id')
.put(ensureAuth,maquina.update)
.delete(ensureAuth,maquina.delete)
.get(ensureAuth,maquina.readMaquina);

module.exports = router