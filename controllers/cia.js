'use strict'

const Cia = require('../models').Cia
const models = require('../models')
var multer = require('multer')
const IncomingForm = require('formidable').IncomingForm;


const CIA_ERROR = {
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
  CIA_NOT_FOUND: {
    status: 404,
    message: 'Cia not Found',
    code: 'CIA_NOT_FOUND'
  },
  LIMIT: {
    status: 403,
    message: 'Limit Reached'
  },
  DUPLICATE: {
    status: 403,
    message: 'Register duplicated'
  },
  CODE_INVALID: {
    status: 403,
    message: 'Invalid Reference Code'
  },
  UNAUTHORIZED: {
    status: 401,
    message: 'Unauthorized'
  },
  CIA_REGISTERED: {
    status: 403,
    message: 'CIA already has registered'
  }
}

function CiaError(error) {
  const { status, message } = error
  this.status = status
  this.message = message

}

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

var upload = multer({ storage: storage }).single('file');

module.exports = {
  getCias: async function (req, res) {
    try {
      const cia = await Cia.findAll()
      if (cia) {
        res.status(200).send({
          code: 200, cia
        })
      } else {
        throw new CiaError(CIA_ERROR.CIA_NOT_FOUND)
      }

    }
    catch (error) {
      console.error(error)
      if (error instanceof CiaError) {
        res.status(error.status).send(error)
      } else {
        res.status(500).send({ ...CIA_ERROR.ERROR })
      }

    }
  },

  createCia: function (req, res) {
    try {
      console.log('entro')
     /*  upload(req, res, function (err) {
         if (err) {
             // An error occurred when uploading
             console.log(err);
 
         } else {
           console.log(req.file);
         }
       });*/
      /*var form = new IncomingForm();
      form.uploadDir = 'uploads';
      form.on('file', function (field, file) {
        console.log("File incoming");
      });
      form.on('error', function (err) {
        console.log('An error has occured: \n' + err);
      });
      form.on('end', function () {
        res.end('success');
      });
*/
      var nombre_cia = req.body.nombre;
      var cia = await Cia.findOne({ where: { nombre: nombre_cia } });
      if (cia) {
        throw new CiaError(CIA_ERROR.DUPLICATE);
      }
      var new_cia = new Cia(req.body);
      const response = await new_cia.save();
      res.status(200).send({ code: 200, status: response.status });
    } catch (error) {
      console.error(error)
      if (error instanceof CiaError) {
        res.status(error.status).send(error)
      } else {
        console.log(error);
        res.status(500).send({ code: 500, message: 'Something Went Wrong' })
      }
    }
  },

  readCia: async function (req, res) {
    try {
      var cia = await Cia.findOne({ where: { idcia: req.params.id } });
      if (cia) {
        res.status(200).send({ code: 200, cia });
      } else {
        throw new CiaError(CIA_ERROR.CIA_NOT_FOUND);
      }
    } catch (error) {
      console.error(error)
      if (error instanceof CiaError) {
        res.status(error.status).send(error)
      } else {
        console.log(error);
        res.status(500).send({ code: 500, message: 'Something Went Wrong' })
      }
    }
  },
  update: async function (req, res) {
    try {
      var cia = await Cia.update(req.body, {
        where: { idcia: req.params.id }
      });
      res.status(200).send({ code: 200, message: 'Cia modificada', cia })
    } catch (e) {
      console.error(error)
      if (error instanceof CiaError) {
        res.status(error.status).send(error)
      } else {
        console.log(error);
        res.status(500).send({ code: 500, message: 'Something Went Wrong' })
      }
    }
  }
}