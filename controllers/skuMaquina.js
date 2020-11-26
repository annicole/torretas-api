
'use strict'

const SKU = require('../models').SKU;
const models = require('../models');
const Maquina = require('../models').Maquina;
const sequelize = models.Sequelize;
let op = sequelize.Op;


const PERFIL_CONFIG_ERROR = {
    ERROR: {
        status: 500,
        message: 'No se pudo guardar el sensor '
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
    PERFIL_NOT_FOUND: {
        status: 404,
        message: 'No se pudo encontrar el sensor',
        code: 'SENSOR_NOT_FOUND'
    },
    LIMIT: {
        status: 403,
        message: 'Limit Reached'
    },
    DUPLICATE: {
        status: 403,
        message: 'La prioridad ya existe'
    },
    CODE_INVALID: {
        status: 403,
        message: 'Invalid Reference Code'
    },
    UNAUTHORIZED: {
        status: 401,
        message: 'Unauthorized'
    },
    PERFIL_REGISTERED: {
        status: 403,
        message: 'Sensor ya existe'
    }
}

function PerfilConfigError(error) {
    const { status, message } = error
    this.status = status
    this.message = message

}

module.exports = {
    get: async function (req, res) {
        try {
            const id = req.query.id;
            let response = await SKU.findAll(
                { where: { idproducto: id },
                order: [
                    ['prioridad', 'ASC']
                ],include:[{
                    model: Maquina,
                    required: false,
                    attributes:['maquina']
                }]
                })
            if (response) {
                res.status(200).send({
                    code: 200, response
                })
            } else {
                throw new PerfilConfigError(PERFIL_CONFIG_ERROR.PERFIL_NOT_FOUND)
            }

        }
        catch (error) {
            console.error(error)
            if (error instanceof PerfilConfigError) {
                res.status(error.status).send(error)
            } else {
                res.status(500).send({ ...PERFIL_CONFIG_ERROR.ERROR })
            }

        }
    },

    create: async function (req, res) {
        try {
            let idmaquina= req.body.idmaquina;
            let sku = await SKU.findOne({ where: { 
                idmaquina: idmaquina
             } });
             if(sku){
                throw new PerfilConfigError(PERFIL_CONFIG_ERROR.DUPLICATE)
             }
            let response_new = new SKU(req.body);
            const response = await response_new.save();
            res.status(200).send({ code: 200, status: response.status });
        } catch (error) {
            console.error(error)
            if (error instanceof PerfilConfigError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },
    delete: async function (req, res) {
        try {
            const response = await SKU.destroy({
                where: { idskumaquina: req.params.id }
            })
            res.status(200).send({ code: 200, message: 'Registro eliminado', response })
        } catch (error) {
            console.error(error)
            if (error instanceof PerfilConfigError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },

    update: async function (req, res) {
        try {
            let skuPrioridad = req.body.prioridad;
            let idproducto= req.body.idproducto;
            skuPrioridad --;
            let skuUP = await SKU.findOne({ where: { 
                idproducto: idproducto,
                prioridad: skuPrioridad
             } });
            req.body.prioridad = skuPrioridad;
            const resp = await SKU.update(req.body, {
                where: { idskumaquina: req.params.id }
            })
             if(skuUP){
                skuPrioridad++;
             const response = await SKU.update(
                 {prioridad: skuPrioridad}, {
                where: { idskumaquina: skuUP.idskumaquina }
            })
            }   
            res.status(200).send({ code: 200, message: 'Registro modificado', resp })
        } catch (error) {
            console.error(error)
            if (error instanceof PerfilConfigError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },
    updateDown:async function(req,res){
        try {
            let skuPrioridad = req.body.prioridad;
            let idproducto= req.body.idproducto;
            skuPrioridad ++;
            req.body.prioridad = skuPrioridad;
            let skuUP = await SKU.findOne({ where: { 
                idproducto: idproducto,
                prioridad: skuPrioridad
             } });
            const resp = await SKU.update(req.body, {
                where: { idskumaquina: req.params.id }
            })
             if(skuUP){
                skuPrioridad--;
             const response = await SKU.update(
                 {prioridad: skuPrioridad}, {
                where: { idskumaquina: skuUP.idskumaquina }
            })
            }   
            res.status(200).send({ code: 200, message: 'Registro modificado', resp })
        } catch (error) {
            console.error(error)
            if (error instanceof PerfilConfigError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },
    read: async function (req, res) {
        try {
            let response = await SKU.findOne({ where: { idskumaquina: req.params.id } });
            if (response) {
                res.status(200).send({ code: 200, response });
            } else {
                throw new PerfilConfigError(PERFIL_CONFIG_ERROR.PERFIL_NOT_FOUND)
            }
        } catch (error) {
            console.error(error)
            if (error instanceof PerfilConfigError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    }
}