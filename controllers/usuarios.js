'use strict'

const Usuario = require('../models').Usuario
const Departamento = require('../models').Departamento
const models = require('../models')
var sequelize = models.Sequelize;
var op = sequelize.Op;


const USUARIO_ERROR = {
    ERROR: {
        status: 500,
        message: 'Something Went Wrong'
    },
    AUTH_FAILED: {
        status: 401,
        message: 'Auth Failed',
        code: 'AUTH_FAILED'
    },
    USUARIO_NOT_FOUND: {
        status: 404,
        message: 'DEPTO not Found',
        code: 'USUARIO_NOT_FOUND'
    },
    LIMIT: {
        status: 403,
        message: 'Limit Reached'
    },
    DUPLICATE: {
        status: 403,
        message: 'Register duplicated'
    },
    CODE_INVALID: {
        status: 403,
        message: 'Invalid Reference Code'
    },
    UNAUTHORIZED: {
        status: 401,
        message: 'Unauthorized'
    },
    USUARIO_REGISTERED: {
        status: 403,
        message: 'Usuario already has registered'
    }
}

function UsuarioError(error) {
    const { status, message } = error
    this.status = status
    this.message = message

}

module.exports = {
    getUsuarios: async function (req, res) {
        let query = {};
        let busqueda = req.query.busqueda;
        if (busqueda != '') {
            query = {
                username: {
                    [op.substring]: busqueda
                }
            }
        }
        try {
            const usuario = await Usuario.findAll({
                attributes: ['id', 'username', 'email', 'password', 'nivelseg', 'iddep'],
                where: query,
                include: [{
                    model: Departamento,
                    required: true,
                    attributes: ['iddep', 'departamento', 'idcia']
                }]
            })
            if (usuario) {
                res.status(200).send({
                    code: 200, usuario
                })
            } else {
                throw new UsuarioError(USUARIO_ERROR.USUARIO_NOT_FOUND)
            }

        }
        catch (error) {
            console.error(error)
            if (error instanceof UsuarioError) {
                res.status(error.status).send(error)
            } else {
                res.status(500).send({ ...USUARIO_ERROR.ERROR })
            }

        }
    },

    createUsuario: async function (req, res) {
        try {
            var usuario = await Usuario.findOne({ where: { username: req.boy.username } });
            if (usuario) {
                throw new UsuarioError(USUARIO_ERROR.DUPLICATE);
            }
            var new_usuario = new Usuario(req.body);
            const response = await new_usuario.save();
            res.status(200).send({ code: 200, status: response.status });
        } catch (error) {
            console.error(error)
            if (error instanceof UsuarioError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },
    readUsuario: async function (req, res) {
        try {
            var usuario = await Usuario.findOne({ where: { id: req.boy.id } });
            if (usuario) {
                res.status(200).send({ code: 200, usuario });
            } else {
                throw new UsuarioError(USUARIO_ERROR.USUARIO_NOT_FOUND);
            }
        } catch (error) {
            console.error(error)
            if (error instanceof UsuarioError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Error al obtener el usuario' })
            }
        }
    },
    update: async function (req, res) {
        try {
            const resp = await Usuario.update(req.body, {
                where: { id: req.params.id }
            })
            res.status(200).send({ code: 200, message: 'Usuario modificado', resp })
        } catch (error) {
            console.error(error)
            if (error instanceof UsuarioError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Error al modificar el usuario' })
            }
        }
    },
    delete: async function (req, res) {
        try {
            const response = await Usuario.destroy({
                where: { id: req.params.id }
            })
            res.status(200).send({ code: 200, message: 'Usuario eliminado', response })
        } catch (error) {
            console.error(error)
            if (error instanceof UsuarioError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Error al eliminar el usuario' })
            }
        }
    }
}
