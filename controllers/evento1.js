'use strict'

const Evento = require('../models').Evento1
const models = require('../models')


const EVENTO_ERROR = {
    ERROR: {
      status: 500,
      message: 'Something Went Wrong'
    },
    PASSWORD_FAIL:{
      status: 406,
      message: 'Password Failed',
      code: 'PASSWORD_FAILED'
    },
    AUTH_FAILED: {
      status: 401,
      message: 'Auth Failed',
      code: 'AUTH_FAILED'
    },
    EVENTO_NOT_FOUND: {
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
  
  function EventoError(error) {
    const { status, message } = error
    this.status = status
    this.message = message
   
  }

module.exports={
    getEventos: async function (req,res){
        try{          
          const evento = await Evento.findAll({ })
          if (evento){
              res.status(200).send({
                evento
              })
          } else{
              throw new EventoError(EVENTO_ERROR.EVENTO_NOT_FOUND)
          }

        }
          catch (error) {
              console.error(error)
              if (error instanceof EventoError) {
                res.status(error.status).send(error)
              } else {
                res.status(500).send({ ...EVENTO_ERROR.ERROR })
          }
            
        }
    }
}