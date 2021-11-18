const express = require('express');
const controladorPeliculas = express.Router();
const servicioPeliculas = require('./service');

/**
    CONTROLADOR
        -> RECIBIR DATOS DEL CLIENTE -> DESDE LA PETICIÓN
        -> PASAR AL SERVICIO
        -> RECIBIR DATOS DEL SERVICIO
        -> ENVIAR UNA RESPUESTA.
*/

/*
    GET -> Obtener todas las películas.
    GET -> Obtener una películas por id.
    GET -> Buscar una película por el título.
    POST -> Crear una nueva película.
    PUT -> Actualizar películas.
    DELETE -> Eliminar una película.
*/

controladorPeliculas.get("/obtenerPeliculas", async function(req, res){
    let peliculas = await servicioPeliculas.obtenerPeliculas();
    res.send({
        "mensaje": "Listado de películas",
        "data": peliculas
    });
});

controladorPeliculas.get("/obtenerPelicula/:id", async function(req, res){
    let id = req.params.id;
    let pelicula = await servicioPeliculas.obtenerPelicula(id);
    res.send({
        "mensaje": "Película",
        "data": pelicula
    });
});

controladorPeliculas.get("/obtenerPeliculasPorTitulo/:titulo", async function(req, res){
    let titulo = req.params.titulo;
    let peliculas = await servicioPeliculas.obtenerPeliculasPorTitulo(titulo);
    res.send({
        "mensaje": "Resultado de la búsqueda",
        "data": peliculas
    });
});

/* el metodo post recibe la info a través del body 
*/
controladorPeliculas.post("/crearPelicula", async function(req, res){

    let datos = req.body;
    let pelicula = await servicioPeliculas.crearPelicula(datos);
    res.send({
        "mensaje": pelicula.mensaje,
        "resultado": pelicula.datos    
    });
});

module.exports = controladorPeliculas;

/*
    CONTROLADOR -> DEFINIR LA RUTA DE ENTRADA/SALIDA AL SISTEMA
        -> CAPTURAR LOS DATOS INICIALES
        -> ENVÍA LOS DATOS FINALES.
    
    SERVICIO
        -> TOMA LOS DATOS INICIALES LOS TRANSFORMA

    MODELO
        -> GESTIONAR LA BASE DE DATOS.
*/