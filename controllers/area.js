    
'use strict'

const Area = require('../models').Area
const models = require('../models')


const AREA_ERROR = {
    ERROR: {
      status: 500,
      message: 'Something Went Wrong'
    },
    AUTH_FAILED: {
      status: 401,
      message: 'Auth Failed',
      code: 'AUTH_FAILED'
    },
    AREA_NOT_FOUND: {
      status: 404,
      message: 'area not Found',
      code: 'AREA_NOT_FOUND'
    },
    LIMIT: {
      status: 403,
      message: 'Limit Reached'
    },
    DUPLICATE: {
      status: 403,
      message: 'The area already exists'
    },
    CODE_INVALID: {
      status: 403,
      message: 'Invalid Reference Code'
    },
    UNAUTHORIZED: {
      status: 401,
      message: 'Unauthorized'
    },
    AREA_REGISTERED: {
      status: 403,
      message: 'Area already has registered'
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