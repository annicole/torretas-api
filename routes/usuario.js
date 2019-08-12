'use strict'

const router = require('express').Router({ mergeParams: true })
const usuario = require('../controllers/usuarios')

router.route('/usuarios')
.get(usuario.getUsuarios)
.post(usuario.createUsuario);

router.route('/read')
.get(usuario.readUsuario);

module.exports = router