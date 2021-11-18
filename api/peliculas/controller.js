const express = require('express');
const controladorPeliculas = express.Router();
const servicioPeliculas = require('./service');
const rutaProtegida = require('../auth/jwt').validarToken;

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

/**
 * BUSCAR TODAS LAS PELÍCULAS
 */
controladorPeliculas.get("/obtenerPeliculas", async function(req, res){
    let peliculas = await servicioPeliculas.obtenerPeliculas();
    res.send({
        "mensaje": "Listado de películas",
        "data": peliculas
    });
});

/**
 * BUSCAR UNA PELÍCULA POR ID
 */
controladorPeliculas.get("/obtenerPelicula/:id", async function(req, res){
    let id = req.params.id;
    let pelicula = await servicioPeliculas.obtenerPelicula(id);
    res.send({
        "mensaje": "Película",
        "data": pelicula
    });
});

/**
 * BUSCAR PELÍCULAS POR TÍTULO
 */
controladorPeliculas.get("/obtenerPeliculasPorTitulo/:titulo", async function(req, res){
    let titulo = req.params.titulo;
    let peliculas = await servicioPeliculas.obtenerPeliculasPorTitulo(titulo);
    res.send({
        "mensaje": "Resultado de la búsqueda",
        "data": peliculas
    });
});

/**
 * CREA UNA NUEVA PELÍCULA
 */
controladorPeliculas.post("/crearPelicula", rutaProtegida, async function(req, res){
    let datos = req.body;
    let pelicula = await servicioPeliculas.crearPelicula(datos);
    res.send({
        "mensaje": pelicula.mensaje,
        "resultado" : pelicula.datos
    });
});

/** 
 * ACTUALIZAR UNA PELÍCULA
*/
controladorPeliculas.put("/actualizarPelicula/:id", rutaProtegida, async function(req, res){
    let id = req.params.id;
    let datos = req.body;
    let resultado = await servicioPeliculas.actualizarPelicula(id,datos);
    res.send(resultado)
});

/**
 * ELIMINAR UNA PELÍCULA
 */
controladorPeliculas.delete("/eliminarPelicula", rutaProtegida, async function(req, res){
    let id = req.query.id;
    let resultado = await servicioPeliculas.eliminarPelicula(id);
    res.send(resultado);
})

module.exports = controladorPeliculas;