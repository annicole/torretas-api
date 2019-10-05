'use strict'

const router = require('express').Router({ mergeParams: true })
const usuario = require('../controllers/usuarios')

router.route('/usuarios')
.get(usuario.getUsuarios)
.post(usuario.createUsuario);

router.route('/read/:id')
.get(usuario.readUsuario)
.put(usuario.update)
.delete(usuario.delete);

router.route('/login')
.post(usuario.loginUser);

module.exports = router