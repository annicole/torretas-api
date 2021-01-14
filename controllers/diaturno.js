'use strict'

const Diaturno = require('../models').Diaturno;
const models = require('../models');
const sequelize = models.Sequelize;
let op = sequelize.Op;

const TURNO_ERROR = {
    ERROR: {
        status: 500,
        message: 'No se pudo guardar el dia de turno'
    },
    PASSWORD_FAIL: {
        status: 406,
        message: 'Password Failed',
        code: 'PASSWORD_FAILED'
    },
    AUTH_FAILED: {
        status: 401,
        message: 'Auth Failed',
        code: 'AUTH_FAILED'
    },
    TURNO_NOT_FOUND: {
        status: 404,
        message: 'No se pudo encontrar el dia de turno',
        code: 'SENSOR_NOT_FOUND'
    },
    LIMIT: {
        status: 403,
        message: 'Limit Reached'
    },
    DUPLICATE: {
        status: 403,
        message: 'El dia de turno ya existe'
    },
    CODE_INVALID: {
        status: 403,
        message: 'Invalid Reference Code'
    },
    UNAUTHORIZED: {
        status: 401,
        message: 'Unauthorized'
    },
    TURNO_REGISTERED: {
        status: 403,
        message: 'Dia de turno ya existe'
    }
}

function TurnoError(error) {
    const { status, message } = error
    this.status = status
    this.message = message
}

module.exports = {
    get: async function (req, res) {
        try {
            let query = {};
            let diaturno = req.query.busqueda;
            if (diaturno != '') {
                query = {
                    idturno: {
                        [op.substring]: diaturno
                    }
                }
            }
            let response = await Diaturno.findAll({
                attributes: ['iddiaturno', 'idturno', 'diasem', 'hrenttur', 'diasemter', 'hrentturter', 'duracion', 'tiempoefec', 'tiposeg', 'diaturno'],
                where: query,
            })
            if (response) {
                res.status(200).send({
                    code: 200, response
                })
            } else {
                throw new TurnoError(TURNO_ERROR.TURNO_NOT_FOUND)
            }

        }
        catch (error) {
            console.error(error)
            if (error instanceof TurnoError) {
                res.status(error.status).send(error)
            } else {
                res.status(500).send({ ...TURNO_ERROR.ERROR })
            }

        }
    },

    create: async function (req, res) {
        try {
            let response_new = new Diaturno(req.body);
            const response = await response_new.save();
            res.status(200).send({ code: 200, status: response.status });
        } catch (error) {
            console.error(error)
            if (error instanceof TurnoError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },
    delete: async function (req, res) {
        try {
            const response = await Diaturno.destroy({
                where: { iddiaturno: req.params.id }
            })
            res.status(200).send({ code: 200, message: 'Registro eliminado', response })
        } catch (error) {
            console.error(error)
            if (error instanceof TurnoError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },

    update: async function (req, res) {
        try {
            const resp = await Diaturno.update(req.body, {
                where: { iddiaturno: req.params.id }
            })
            res.status(200).send({ code: 200, message: 'Registro modificado', resp })
        } catch (error) {
            console.error(error)
            if (error instanceof TurnoError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },
    read: async function (req, res) {
        try {
            let response = await Diaturno.findOne({ where: { iddiaturno: req.params.id } });
            if (response) {
                res.status(200).send({ code: 200, response });
            } else {
                throw new TurnoError(TURNO_ERROR.TURNO_NOT_FOUND)
            }
        } catch (error) {
            console.error(error)
            if (error instanceof TurnoError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    }
}