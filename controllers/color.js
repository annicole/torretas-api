    
'use strict'

const Color = require('../models').Color
const models = require('../models')


const COLOR_ERROR = {
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
    COLOR_NOT_FOUND: {
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
  
  function ColorError(error) {
    const { status, message } = error
    this.status = status
    this.message = message
   
  }

module.exports={
    getColores: async function (req,res){
        try{          
          const color = await Color.findAll({
            attributes : ['idcolor', 'color', 'numcolor']
          })
          if (color){
              res.status(200).send({
                color
              })
          } else{
              throw new ColorError(COLOR_ERROR.COLOR_NOT_FOUND)
          }

        }
          catch (error) {
              console.error(error)
              if (error instanceof ColorError) {
                res.status(error.status).send(error)
              } else {
                res.status(500).send({ ...COLOR_ERROR.ERROR, doctor })
          }
            
        }
    },

    createColor: async function (req,res){
      try{
           var new_COLOR = new Color(req.body);
           const response= await new_COLOR.save();
           res.status(200).send({code:200, status:response.status});
      }catch(error){
           console.error(error)
           if (error instanceof ColorError)  {
              res.status(error.status).send(error)
            }else{        
                console.log(error);
               res.status(500).send({code:500, message: 'Something Went Wrong' })
            }
       }
    }
}