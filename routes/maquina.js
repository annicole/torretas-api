'use strict'

const router = require('express').Router({ mergeParams: true })
const maquina = require('../controllers/maquina')

router.route('/maquinas')
.get(maquina.getMaquinas)
.post(maquina.createMaquina);

router.route('/read/:id')
.put(maquina.update)
.delete(maquina.delete)
.get(maquina.readMaquina)

module.exports = router