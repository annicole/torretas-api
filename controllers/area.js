    
'use strict'

const Area = require('../models').Area
const models = require('../models')


const AREA_ERROR = {
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
  
  function AreaError(error) {
    const { status, message } = error
    this.status = status
    this.message = message
   
  }

module.exports={
    getAreas: async function (req,res){
        try{          
          const area = await Area.findAll({
            attributes : ['idarea', 'area', 'idcia']
          })
          if (area){
              res.status(200).send({code:200,area
              })
          } else{
              throw new AreaError(AREA_ERROR.AREA_NOT_FOUND)
          }

        }
          catch (error) {
              console.error(error)
              if (error instanceof AreaError) {
                res.status(error.status).send(error)
              } else {
                res.status(500).send({ ...AREA_ERROR.ERROR })
          }
            
        }
    },

    createArea: async function (req,res){
      try{
           var new_area = new Area(req.body);
           const response= await new_area.save();
           res.status(200).send({code:200, status:response.status});
      }catch(error){
           console.error(error)
           if (error instanceof AreaError)  {
              res.status(error.status).send(error)
            }else{        
                console.log(error);
               res.status(500).send({code:500, message: 'Something Went Wrong' })
            }
       }
    }
}