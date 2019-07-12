/*const mysql = require('mysql');

const { database} = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((error,connection)=>{
    if(err){
        if(err.code == 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION HAS CLOSED');
        }
        if(err.code == 'ER_CON_COUN_ERROR'){
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if(err.code == 'ECONNREFUSED'){
            console.error('DATABASE CONNECTIONS WAS REFUSED');
        }
    }

    if(connection)connection.release();
    console.log('DB is Connected');
    return;
});

pool.query = promisify(pool.query);
module.exports = pool;*/

const Sequilize = require('sequelize');
const db={};
const sequelize = new Sequilize('','','',{
    host:'',
    dialect:'mysql',
    operatorsAliases:false,
    pool:{
        max:5,
        min:0,
        acquire:3000,
        idle:1000
    }
})

db.sequelize = sequelize;
db.Sequilize = Sequilize;

module.exports = db



