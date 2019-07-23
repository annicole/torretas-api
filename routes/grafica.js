'use strict'

const router = require('express').Router({ mergeParams: true })
const grafica = require('../controllers/grafica');

router.route('/graficaSensor')
.get(grafica.getGrafica);

module.exports = router