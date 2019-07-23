const router = require('express').Router()
const maquina = require('./maquina')
const color = require('./color')
const area = require('./area')
const sensor = require('./sensor')
const paro = require('./paro')
const evento = require('./eventos')
const grafica = require('./grafica')

//all of the routing will be done here


module.exports = function (app) {

  app.use('/maquina', maquina),
  app.use('/color', color),
  app.use('/sensor', sensor),
  app.use('/area', area),
  app.use('/paro', paro),
  app.use('/evento', evento)
  app.use('/grafica',grafica)
  app.use(router)
}