
'use strict'

const Evento = require('../models').Evento


const EVENTO_ERROR = {
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
  COLOR_NOT_FOUND: {
    status: 404,
    message: 'Color not Found',
    code: 'COLOR_NOT_FOUND'
  },
  LIMIT: {
    status: 403,
    message: 'Limit Reached'
  },
  DUPLICATE: {
    status: 403,
    message: 'The color already has an account'
  },
  CODE_INVALID: {
    status: 403,
    message: 'Invalid Reference Code'
  },
  UNAUTHORIZED: {
    status: 401,
    message: 'Unauthorized'
  },
  COLOR_REGISTERED: {
    status: 403,
    message: 'Doctor already has registered'
  }
}

function EventoError(error) {
  const { status, message } = error
  this.status = status
  this.message = message

}

module.exports = {
  getEventos: async function (req, res) {
    try {
      const eventos = await Evento.findAll({
        attributes: ['idevento', 'evento', 'color']
      })
      if (eventos) {
        res.status(200).send({
          code: 200, eventos
        })
      } else {
        throw new EventoError(EVENTO_ERROR.COLOR_NOT_FOUND)
      }

    }
    catch (error) {
      console.error(error);
      if (error instanceof EventoError) {
        res.status(error.status).send(error)
      } else {
        res.status(500).send({ ...EVENTO_ERROR.ERROR })
      }

    }
  }
}