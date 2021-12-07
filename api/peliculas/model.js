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

    /*
        TODO: PAGINACIÓN
            -> limit()
            -> skip()
    */

    return db.collection("peliculas").find({}).limit(100).toArray()
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

function crearUna(datos) {
    let db = basedatos.obtenerConexion();

    return db.collection("peliculas").insertOne(datos)
        .then(function(resConsulta){
            return resConsulta;
        })
        .catch(function(error){
            console.log(error);
        })
}

function actualizarUna(id, datos){
    let db = basedatos.obtenerConexion();
    /*
        datos -> {
            "titulo": XXX,
            "generos": ["A", "B"]
        }
    */
    return db.collection("peliculas").updateOne(
            {"_id":objectId(id)},
            {"$set": datos}
        )
        .then(function(resultado){
            console.log(resultado);
            return resultado;
        })
        .catch(function(error){
            console.log(error);
        })
}

function eliminarUna(id){
    let db = basedatos.obtenerConexion();

    return db.collection("peliculas").deleteOne({"_id": objectId(id)})
        .then(function(resultado){
           return resultado; 
        })
        .catch(function(error){
            console.log(error);
        })
}

module.exports.obtenerTodas = obtenerTodas;
module.exports.obtenerUna = obtenerUna;
module.exports.obtenerPorTitulo = obtenerPorTitulo;
module.exports.crearUna = crearUna;
module.exports.actualizarUna = actualizarUna;
module.exports.eliminarUna = eliminarUna;