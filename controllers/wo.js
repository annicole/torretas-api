'use strict'
const Wo = require('../models').Wo;
const Empresa = require('../models').Empresa;
const Contemp = require('../models').Contemp;
const Usuario = require('../models').Usuario;
const Statuswo = require('../models').Statuswo;
const models = require('../models');
const sequelize = models.Sequelize;
const op = sequelize.Op;


const WO_ERROR = {
    ERROR: {
        status: 500,
        message: 'Error al guardar los cambios'
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
    WO_NOT_FOUND: {
        status: 404,
        message: 'Contacto no encontrado',
        code: 'WO_NOT_FOUND'
    },
    LIMIT: {
        status: 403,
        message: 'Limit Reached'
    },
    DUPLICATE: {
        status: 403,
        message: 'El contacto ya existe'
    },
    CODE_INVALID: {
        status: 403,
        message: 'Invalid Reference Code'
    },
    UNAUTHORIZED: {
        status: 401,
        message: 'Unauthorized'
    },
    WO_REGISTERED: {
        status: 403,
        message: 'El contacto ya existe'
    }
}

function WoError(error) {
    const { status, message } = error
    this.status = status
    this.message = message

}

module.exports = {

    get: async function (req, res) {
        try {
            let query = {};
            let wo = req.query.busqueda;
            if (wo != '') {
                query = {
                    idwo: {
                        [op.substring]: wo
                    }
                }
            }
            let response = await Wo.findAll({
                attributes: ['idwo', 'woasig', 'idempresa', 'idcontacto', 'idempleado', 'fechasol', 'ocliente', 'idstatuswo','fechavenoc'],
                where: query,
                include: [
                    {
                        model: Empresa,
                        required: false,
                        attributes: ['idempresa', 'nomemp'],
                    },
                    {
                     model: Contemp,
                    required: false,
                    attributes: ['idcontemp', 'nomcontemp'],
                    },
                    {
                        model: Usuario,
                        required: false,
                        attributes: ['id', 'username'],
                    },
                    {
                        model: Statuswo,
                        required: false,
                        attributes: ['idstatuswo', 'statuswo'],
                    },
                    
                ]
            })
            if (response) {
                res.status(200).send({
                    code: 200, response
                })
            } else {
                throw new (WO_ERROR.WO_NOT_FOUND)
            }

        }
        catch (error) {
            console.error(error)
            if (error instanceof WoError) {
                res.status(error.status).send(error)
            } else {
                res.status(500).send({ ...WO_ERROR.ERROR })
            }

        }
    },
    create: async function (req, res) {
        try {
            let nombre_wo = req.body.ocliente ;
            let wo = await Wo.findOne({ where: { ocliente: nombre_wo } });
            if (wo) {
                throw new WoError(WO_ERROR.DUPLICATE);
            }
            let new_wo = new Wo(req.body);
            const response = await new_wo.save();
            res.status(200).send({ code: 200, status: response.status });
        } catch (error) {
            console.error(error)
            if (error instanceof WoError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },

    delete: async function (req, res) {
        try {
            const response = await Wo.destroy({
                where: { idwo: req.params.id }
            })
            res.status(200).send({ code: 200, message: 'Contacto eliminadao', response })
        } catch (error) {
            console.error(error)
            if (error instanceof WoError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },


    update: async function (req, res) {
        try {
            let wo = await Wo.update(req.body, {
                where: { idwo: req.params.id }
            });
            res.status(200).send({ code: 200, message: 'Orden de Manufactura modificada', wo })
        } catch (e) {
            console.error(error)
            if (error instanceof WoError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },

    read: async function (req, res) {
        try {
            let response = await Wo.findOne({

                where: { idwo: req.params.id }

            });
            if (response) {
                res.status(200).send({ code: 200, response });
            } else {
                throw new WoError(WO_ERROR.WO_NOT_FOUND)
            }
        } catch (error) {
            console.error(error)
            if (error instanceof WoError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    }

}
