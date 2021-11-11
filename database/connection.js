// IMPORTAR LOS MÓDULOS
const mongoClient = require('mongodb').MongoClient;
require('dotenv').config();

let conexion;

const conectar = function(){
    return new Promise(function(resolve, reject){
        if(conexion){
            resolve();
        }
        else{
            mongoClient.connect(process.env.MONGODB_URI, {useNewUrlParser: true})
                .then(function(client){
                    conexion = client.db(process.env.MONGODB_DB);
                    resolve();
                })
                .catch(function(error){
                    reject(error);
                });
        }
    });  
}

const obtenerConexion = function(){
    return conexion;
}

module.exports = {conectar, obtenerConexion}