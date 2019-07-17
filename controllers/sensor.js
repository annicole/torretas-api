
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
    message: 'Doctor not Found',
    code: 'DOCTOR_NOT_FOUND'
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
  DOCTOR_REGISTERED: {
    status: 403,
    message: 'Doctor already has registered'
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
  }
}