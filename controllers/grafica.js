'use strict'

var Sequelize = require('sequelize');
const models = require('../models');
var sequelize = models.sequelize;

const GRAFICA_ERROR = {
  ERROR: {
    status: 500,
    message: 'Something Went Wrong'
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
  AREA_NOT_FOUND: {
    status: 404,
    message: 'Doctor not Found',
    code: 'DOCTOR_NOT_FOUND'
  },
  LIMIT: {
    status: 403,
    message: 'Limit Reached'
  },
  DUPLICATE: {
    status: 403,
    message: 'The machine already has an account'
  },
  CODE_INVALID: {
    status: 403,
    message: 'Invalid Reference Code'
  },
  INVALID_EMAIL: {
    status: 403,
    message: 'Invalid Email',
    code: 'INVALID_EMAIL'
  },
  INVALID_PASSWORD: {
    status: 403,
    message: 'Invalid Password',
    code: 'INVALID_PASSWORD'
  },
  UNAUTHORIZED: {
    status: 401,
    message: 'Unauthorized'
  },
  DOCTOR_REGISTERED: {
    status: 403,
    message: 'Doctor already has registered'
  }
}

function GraficaError(error) {
  const { status, message } = error
  this.status = status
  this.message = message

}

module.exports = {
  getGrafica: async function (req, res) {
    try {
      var maquina = req.query.maquina;
      var fechaInicio = req.query.inicio;
      var fechaFin = req.query.fin;
      const grafica =await sequelize.query('CALL grafica2(:maq,:fechaInicio,:fechaFinal)',
      {replacements: { maq: maquina, fechaInicio: fechaInicio, fechaFinal: fechaFin, }});
      if(grafica){
          res.status(200).send({code:200,grafica});
      }else{
          throw new GraficaError(GRAFICA_ERROR.AREA_NOT_FOUND)
      }
    } catch (error) {
      console.error(error)
      if (error instanceof GraficaError) {
        res.status(error.status).send(error)
      } else {
        res.status(500).send({ ...GRAFICA_ERROR.ERROR })
      }
    }
  }


}

