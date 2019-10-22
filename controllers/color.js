    
'use strict'

const Color = require('../models').Color


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
              res.status(200).send({code:200,color
              })
          } else{
              throw new ColorError(COLOR_ERROR.COLOR_NOT_FOUND)
          }

        }
          catch (error) {
              console.error(error);
              if (error instanceof ColorError) {
                res.status(error.status).send(error)
              } else {
                res.status(500).send({ ...COLOR_ERROR.ERROR, doctor })
          }
            
        }
    },

    createColor: async function (req,res){
      try{
           let new_COLOR = new Color(req.body);
           const response= await new_COLOR.save();
           res.status(200).send({code:200, status:response.status});
      }catch(error){
           console.error(error);
           if (error instanceof ColorError)  {
              res.status(error.status).send(error)
            }else{        
                console.log(error);
               res.status(500).send({code:500, message: 'Something Went Wrong' })
            }
       }
    }
}