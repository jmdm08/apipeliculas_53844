const basedatos = require('../../database/connection');
const objectId = require('mongodb').ObjectId;

/*
    MODELO -> MANIPULAR LA BASE DE DATOS
        -> RECIBE UNA SOLICITUD DESDE EL SERVICIO
            -> OBTENER DATOS DE LA BASE DATOS
            -> ACTUALIZAR
            -> GUARDAR NUEVOS DATOS
            -> ELIMINAR DATOS EXISTENTES.
        -> LOS ENVÍA AL SERVICIO
*/

function obtenerTodas(){
    let db = basedatos.obtenerConexion();
    // db -> conexion
    // db.peliculas
    // db.peliculas.find({});

    return db.collection("peliculas").find({}).toArray()
        .then(function(peliculas){
            return peliculas;
        })
        .catch(function(error){
            console.log(error);
        });
}

function obtenerUna(id){
    let db = basedatos.obtenerConexion();

    return db.collection("peliculas").findOne({"_id": objectId(id)})
        .then(function(pelicula){
            return pelicula;
        })
        .catch(function(error){
            console.log(error);
        })
}

function obtenerPorTitulo(titulo){
    let db = basedatos.obtenerConexion();

    return db.collection("peliculas").find({"titulo":new RegExp(titulo,"i")}).toArray()
        .then(function(peliculas){
            return peliculas;
        })
        .catch(function(error){
            console.log(error);
        });
}

module.exports.obtenerTodas = obtenerTodas;
module.exports.obtenerUna = obtenerUna;
module.exports.obtenerPorTitulo = obtenerPorTitulo;