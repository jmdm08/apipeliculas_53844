const express = require('express');
const controladorPeliculas = express.Router();

/*
    GET -> Obtener todas las películas.
    GET -> Obtener una películas por id.
    GET -> Buscar una película por el título.
    POST -> Crear una nueva película.
    PUT -> Actualizar películas.
    DELETE -> Eliminar una película.
*/

controladorPeliculas.get("/obtenerPeliculas", function(req, res){
    res.send("Listando películas...")
});

module.exports = controladorPeliculas;