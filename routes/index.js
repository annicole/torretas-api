const router = require('express').Router()
const maquina = require('./maquina')

//all of the routing will be done here


module.exports = function (app) {

  app.use('/maquina', maquina)
  app.use(router)
}