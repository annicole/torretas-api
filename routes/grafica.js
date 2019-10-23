'use strict'

const router = require('express').Router({ mergeParams: true })
const grafica = require('../controllers/grafica');
const auth = require('../middleware/auth');
const { ensureAuth } = auth;

router.route('/graficaSensor')
.get(ensureAuth,grafica.getGrafica);

module.exports = router