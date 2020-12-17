
'use strict'

const ProgProd = require('../models').ProgProd;
const models = require('../models');
const sequelize = models.sequelize;
let op = sequelize.Op;

const CONST_ERROR = {
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
    NOT_FOUND: {
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
        message: 'El sensor ya existe'
    },
    CODE_INVALID: {
        status: 403,
        message: 'Invalid Reference Code'
    },
    UNAUTHORIZED: {
        status: 401,
        message: 'Unauthorized'
    },
    REGISTERED: {
        status: 403,
        message: 'Sensor ya existe'
    }
    
}

function Error(error) {
    const { status, message } = error
    this.status = status
    this.message = message

}

module.exports = {
    getprogprodwo: async function (req, res) {
        try {
          const progprodwo =await sequelize.query('CALL progprodfwo();');
          if(progprodwo){
              res.status(200).send({code:200,progprodwo});
          }else{
              throw new Error(CONST_ERROR.NOT_FOUND)
          }
        } catch (error) {
          console.error(error)
          if (error instanceof Error) {
            res.status(error.status).send(error)
          } else {
            res.status(500).send({ ...CONST_ERROR.ERROR })
          }
        }
      },
      getprogprodprod: async function (req, res) {
        try {
          let id = req.query.id;
          const progprod =await sequelize.query('CALL progprodfprod(:id)',{replacements: { id: id}});
          if(progprod){
              res.status(200).send({code:200,progprod});
          }else{
              throw new Error(CONST_ERROR.NOT_FOUND)
          }
        } catch (error) {
          console.error(error)
          if (error instanceof Error) {
            res.status(error.status).send(error)
          } else {
            res.status(500).send({ ...CONST_ERROR.ERROR })
          }
        }
      },
      getprogprodf: async function (req, res) {
        try {
            let idMaquina = req.query.idMaquina == '' ? '-1' : req.query.idMaquina ;
            let idEmpresa = req.query.idEmpresa == '' ? '-1' : req.query.idEmpresa;
            let idProducto = req.query.idProducto == '' ? '-1' : req.query.idProducto;
            const progprod =await sequelize.query('CALL progprodf(:idMaquina,:idEmpresa,:idProducto)',{replacements: { idMaquina: idMaquina,idEmpresa:idEmpresa,idProducto:idProducto}});
          if(progprod){
              res.status(200).send({code:200,progprod});
          }else{
              throw new Error(CONST_ERROR.NOT_FOUND)
          }
        } catch (error) {
          console.error(error)
          if (error instanceof Error) {
            res.status(error.status).send(error)
          } else {
            res.status(500).send({ ...CONST_ERROR.ERROR })
          }
        }
      },
    create: async function (req, res) {
        try {
            let response_new = new ProgProd(req.body);
            const response = await response_new.save();
            res.status(200).send({ code: 200, status: response.status });
        } catch (error) {
            console.error(error)
            if (error instanceof Error) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },
    delete: async function (req, res) {
        try {
            const response = await Producto.destroy({
                where: { idproducto: req.params.id }
            })
            res.status(200).send({ code: 200, message: 'Producto eliminado', response })
        } catch (error) {
            console.error(error)
            if (error instanceof Error) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },

    updateUp: async function (req, res) {
        try {
            let prioridad = req.body.prioridad;
            let id= req.body.idproducto;
            prioridad --;
            let progprod = await SKU.findOne({ where: { 
                idprogprod: id,
                prioridad: prioridad
             } });
            req.body.prioridad = prioridad;
            const resp = await SKU.update(req.body, {
                where: { idskumaquina: req.params.id }
            })
             if(progprod){
                prioridad++;
             const response = await SKU.update(
                 {prioridad: prioridad}, {
                where: { idprogprod: progprod.idprogprod }
            })
            }   
            res.status(200).send({ code: 200, message: 'Registro modificado', resp })
        } catch (error) {
            console.error(error)
            if (error instanceof Error) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },
    updateDown:async function(req,res){
        try {
            let prioridad = req.body.prioridad;
            let idproducto= req.body.idproducto;
            prioridad ++;
            req.body.prioridad = skuPrioridad;
            let skuUP = await SKU.findOne({ where: { 
                idproducto: idproducto,
                prioridad: prioridad
             } });
            const resp = await SKU.update(req.body, {
                where: { idprogprod: req.params.id }
            })
             if(skuUP){
                prioridad--;
             const response = await SKU.update(
                 {prioridad: prioridad}, {
                where: { idskumaquina: skuUP.idskumaquina }
            })
            }   
            res.status(200).send({ code: 200, message: 'Registro modificado', resp })
        } catch (error) {
            console.error(error)
            if (error instanceof Error) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    }
}