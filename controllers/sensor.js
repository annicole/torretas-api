
'use strict'

const Sensor = require('../models').Sensor
const models = require('../models')


const SENSOR_ERROR = {
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
  SENSOR_NOT_FOUND: {
    status: 404,
    message: 'Sensor not Found',
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
  SENSOR_REGISTERED: {
    status: 403,
    message: 'Sensor already has registered'
  }
}

function SensorError(error) {
  const { status, message } = error
  this.status = status
  this.message = message

}

module.exports = {
  getSensores: async function (req, res) {
    try {
      const sensor = await Sensor.findAll({
        attributes: ['idsensor', 'sensor', 'idmaquina', 'color', 'intermitente', 'tipo']
      })
      if (sensor) {
        res.status(200).send({
          code: 200, sensor
        })
      } else {
        throw new SensorError(SENSOR_ERROR.SENSOR_NOT_FOUND)
      }

    }
    catch (error) {
      console.error(error)
      if (error instanceof SensorError) {
        res.status(error.status).send(error)
      } else {
        res.status(500).send({ ...SENSOR_ERROR.ERROR })
      }

    }
  },

  createSensor: async function (req, res) {
    try {
      var nombre_sensor = req.body.sensor;
      var sensor = await Sensor.findOne({ where: { sensor: nombre_sensor } });
      if (sensor) {
        throw new SensorError(SENSOR_ERROR.DUPLICATE);
      }
      var new_Sensor = new Sensor(req.body);
      const response = await new_Sensor.save();
      res.status(200).send({ code: 200, status: response.status });
    } catch (error) {
      console.error(error)
      if (error instanceof SensorError) {
        res.status(error.status).send(error)
      } else {
        console.log(error);
        res.status(500).send({ code: 500, message: 'Something Went Wrong' })
      }
    }
  },
  delete: async function (req, res) {
    try {
      const response = await Sensor.destroy({
        where: { idsensor: req.params.id }
      })
      res.status(200).send({ code: 200, message: 'Sensor eliminado', response })
    } catch (error) {
      console.error(error)
      if (error instanceof SensorError) {
        res.status(error.status).send(error)
      } else {
        console.log(error);
        res.status(500).send({ code: 500, message: 'Something Went Wrong' })
      }
    }
  },

  update: async function (req, res) {
    try {
      const resp = await Sensor.update(req.body, {
        where: { idsensor: req.params.id }
      })
      res.status(200).send({ code: 200, message: 'Sensor modificado', resp })
    } catch (error) {
      console.error(error)
      if (error instanceof SensorError) {
        res.status(error.status).send(error)
      } else {
        console.log(error);
        res.status(500).send({ code: 500, message: 'Something Went Wrong' })
      }
    }
  },
  readSensor: async function (req, res) {
    try {
      var sensor = await Sensor.findOne({ where: { idsensor: req.params.id } });
      if (sensor) {
        res.status(200).send({ code: 200, sensor });
      } else {
        throw new SensorError(SENSOR_ERROR.SENSOR_NOT_FOUND)
      }
    } catch (error) {
      console.error(error)
      if (error instanceof SensorError) {
        res.status(error.status).send(error)
      } else {
        console.log(error);
        res.status(500).send({ code: 500, message: 'Something Went Wrong' })
      }
    }
  }
}