var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser')

//Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000));
app.use(cors());

//models of sequilize
const models = require('./models');

const routes = require('./routes/index');
routes(app);

models.sequelize.sync().then(function () {
  app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
  });
});

/*app.listen(port, () => {
 console.log('list RESTful API server started on: ' + port);
});*/




