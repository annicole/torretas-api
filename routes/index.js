const router = require('express').Router()
const maquina = require('./maquina')
const eventoSensor = require('./evento')
const area = require('./area')
const sensor = require('./sensor')
const paro = require('./paro')
const eventos = require('./eventos')
const grafica = require('./grafica')
const cia = require('./cia')
const depto = require('./departamento')
const usuario = require('./usuario')
const tipoEquipo = require('./tipoEquipo')
const moduloInterfaz = require('./moduloInterfaz')
const perfilConfig = require('./perfilConfig')
const configuracionModulo = require('./configuracionModulo')
const respirador = require('./respirador')
//all of the routing will be done here


module.exports = function (app) {

  app.use('/maquina', maquina),
    app.use('/sensor', sensor),
    app.use('/area', area),
    app.use('/paro', paro),
    app.use('/evento', eventos),
    app.use('/grafica', grafica),
    app.use('/cia', cia),
    app.use('/departamento', depto),
    app.use('/usuario', usuario),
    app.use('/tipoEquipo', tipoEquipo),
    app.use('/eventoSensor', eventoSensor),
    app.use('/moduloInterfaz', moduloInterfaz),
    app.use('/perfilConfig', perfilConfig),
    app.use('/configuracionModulo', configuracionModulo),
    app.use('/respirador', respirador)
  app.use(router)
}