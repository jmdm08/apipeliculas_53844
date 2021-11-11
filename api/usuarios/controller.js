const express = require('express');
const controladorUsuarios = express.Router();

/*
    GET -> Iniciar Sesión.
    GET -> Obtener un usuario por el id.
*/

controladorUsuarios.get("/iniciarSesion", function(req, res){
    let datos = req.query; 
    res.send("Los dos del usuario son: " + datos.usuario + " " + datos.contrasena)
});

module.exports = controladorUsuarios;