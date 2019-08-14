'use strict'

const router = require('express').Router({ mergeParams: true })
const departamento = require('../controllers/departamento')

router.route('/departamentos')
.get(departamento.getDepartamentos)
.post(departamento.createDepartamento);

router.route('/read/:id')
.put(departamento.update)
.delete(departamento.delete)
.get(departamento.readDepartamento)

module.exports = router