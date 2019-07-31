'use strict'

const router = require('express').Router({ mergeParams: true })
const departamento = require('../controllers/departamento')

router.route('/departamentos')
.get(departamento.getDepartamentos)
.post(departamento.createDepartamento);

module.exports = router