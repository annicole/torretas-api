
'use strict'

const Maquina = require('../models').Maquina
const Area = require('../models').Area
const models = require('../models')
const sequelize = models.Sequelize;
const op = sequelize.Op;


const MAQUINA_ERROR = {
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
  MAQUINA_NOT_FOUND: {
    status: 404,
    message: 'Máquina no encontrada',
    code: 'MAQUINA_NOT_FOUND'
  },
  LIMIT: {
    status: 403,
    message: 'Limit Reached'
  },
  DUPLICATE: {
    status: 403,
    message: 'La máquina ya existe'
  },
  CODE_INVALID: {
    status: 403,
    message: 'Invalid Reference Code'
  },
  UNAUTHORIZED: {
    status: 401,
    message: 'Unauthorized'
  },
  MAQUINA_REGISTERED: {
    status: 403,
    message: 'La máquina ya existe'
  }
}

function MaquinaError(error) {
  const { status, message } = error
  this.status = status
  this.message = message

}

module.exports = {
  getMaquinas: async function (req, res) {
    try {
      let query = {};
      let busqueda = req.query.busqueda;
      const area = req.query.area;
      if (busqueda != '' && area != '') {
        query = {
          idarea:area,
          maquina: {
            [op.substring]: busqueda
          }
        }
      }
      else if (busqueda != '') {
        query = {
          maquina: {
            [op.substring]: busqueda
          }
        }
      } else if (area != '') {
        query = { idarea: area }
      }
      const maquina = await Maquina.findAll({
        attributes: ['idmaquina', 'maquina', 'idarea', 'descripcion'],
        where: query,
        include: [{
          model: Area,
          required: true,
          attributes: ['area', 'idarea']
        }]
      })
      if (maquina) {
        res.status(200).send({
          code: 200, maquina
        })
      } else {
        throw new MaquinaError(MAQUINA_ERROR.MAQUINA_NOT_FOUND)
      }

    }
    catch (error) {
      console.error(error)
      if (error instanceof MaquinaError) {
        res.status(error.status).send(error)
      } else {
        res.status(500).send({ ...MAQUINA_ERROR.ERROR })
      }

    }
  },

  createMaquina: async function (req, res) {
    try {
      let nombre_maquina = req.body.maquina;
      let maquina = await Maquina.findOne({ attributes: ['idmaquina', 'maquina', 'idarea', 'descripcion'], where: { maquina: nombre_maquina } });
      if (maquina) {
        throw new MaquinaError(MAQUINA_ERROR.DUPLICATE);
      }
      let new_maquina = new Maquina(req.body);
      const response = await new_maquina.save();
      res.status(200).send({ code: 200, status: response.status });
    } catch (error) {
      console.error(error)
      if (error instanceof MaquinaError) {
        res.status(error.status).send(error)
      } else {
        res.status(500).send({ code: 500, message: 'Something Went Wrong' })
      }
    }
  },
  delete: async function (req, res) {
    try {
      const response = await Maquina.destroy({
        where: { idmaquina: req.params.id }
      })
      res.status(200).send({ code: 200, message: 'Máquina eliminada', response })
    } catch (error) {
      console.error(error)
      if (error instanceof MaquinaError) {
        res.status(error.status).send(error)
      } else {
        console.log(error);
        res.status(500).send({ code: 500, message: 'Something Went Wrong' })
      }
    }
  },

  update: async function (req, res) {
    try {
      const resp = await Maquina.update(req.body, {
        where: { idmaquina: req.params.id }
      })
      res.status(200).send({ code: 200, message: 'Máquina modificada', resp })
    } catch (error) {
      console.error(error)
      if (error instanceof MaquinaError) {
        res.status(error.status).send(error)
      } else {
        console.log(error);
        res.status(500).send({ code: 500, message: 'Something Went Wrong' })
      }
    }
  },
  readMaquina: async function (req, res) {
    try {
      let maquina = await Maquina.findOne({ where: { idmaquina: req.params.id } });
      if (maquina) {
        res.status(200).send({ code: 200, maquina });
      } else {
        throw new MaquinaError(MAQUINA_ERROR.MAQUINA_NOT_FOUND)
      }
    } catch (error) {
      console.error(error)
      if (error instanceof MaquinaError) {
        res.status(error.status).send(error)
      } else {
        console.log(error);
        res.status(500).send({ code: 500, message: 'Something Went Wrong' })
      }
    }
  }
}