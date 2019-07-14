'use strict'

const router = require('express').Router({ mergeParams: true })
const maquina = require('../controllers/maquina')

router.route('/maquinas')
.get(maquina.getMaquinas)
.post(maquina.createMaquina);

module.exports = router