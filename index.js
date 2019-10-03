var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser')

//Middlewares
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000));
app.use(cors());
/*app.use(express.json({limit: '200mb'}));
app.use(express.urlencoded({limit: '200mb'}));
app.use(bodyParser.json({limit: '200mb'}));
app.use(bodyParser.urlencoded({limit: '200mb', extended: true,parameterLimit:50000}));*/

//models of sequilize
const models = require('./models');

const routes = require('./routes/index');
routes(app);

models.sequelize.sync().then(function () {
  app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
  });
});


// // if no PostgreSQL database is needed
 /*app.listen(app.get('port'), function () {
   console.log('Node app is running on port', app.get('port'));
 });*/




