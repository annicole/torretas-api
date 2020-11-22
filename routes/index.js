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
const raw = require('./raw')
const subensamble = require('./subensamble')
const producto = require('./producto')
const um = require('./um')
const relcomp = require('./relcomp')
const pais = require('./pais')
const ciudad = require('./ciudad')
const estado = require('./estado')
const condpago = require('./condpago')
const contemp = require('./contemp')
const empresa = require('./empresa')
const wo = require('./wo')
const statuswo = require('./statuswo')
const skuMaquina = require('./skuMaquina')
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
    app.use('/subensamble', subensamble),
    app.use('/um', um),
    app.use('/producto', producto),
    app.use('/raw', raw),
    app.use('/relcomp', relcomp),
    app.use('/pais', pais),
    app.use('/ciudad', ciudad),
    app.use('/estado', estado),
    app.use('/condpago', condpago),
    app.use('/contemp', contemp),
    app.use('/empresa', empresa),
    app.use('/wo', wo),
    app.use('/statuswo', statuswo),
    app.use('/skuMaquina',skuMaquina),
  app.use(router)
}