// IMPORTAR LOS MÓDULOS
const mongoClient = require('mongodb').MongoClient;
require('dotenv').config();

let database;

const conectar = function(){
    return new Promise(function(resolve, reject){
        if(database){
            resolve();
        }
        else{
            mongoClient.connect(process.env.MONGODB_URI, {useNewUrlParser: true})
                .then(function(client){
                    database = client.db(process.env.MONGODB_DB);
                    resolve();
                })
                .catch(function(error){
                    reject(error);
                });
        }
    });  
}

const obtenerConexion = function(){
    return database;
}

module.exports = {conectar, obtenerConexion}