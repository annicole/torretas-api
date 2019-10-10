'use strict'

const router = require('express').Router({ mergeParams: true });
const usuario = require('../controllers/usuarios');

const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/usuarios')
.get(usuario.getUsuarios,ensureAuth)
.post(usuario.createUsuario,ensureAuth);

router.route('/read/:id')
.get(usuario.readUsuario,ensureAuth)
.put(usuario.update,ensureAuth)
.delete(usuario.delete,ensureAuth);

router.route('/login')
.post(usuario.login);

module.exports = router