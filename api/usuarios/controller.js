const express = require('express');
const controladorUsuarios = express.Router();
const servicioUsuarios = require('./service');

/*
    GET -> Iniciar Sesión.
    POST -> Crear usuario.
*/

/**
 * INICIAR SESIÓN.
 */
controladorUsuarios.get("/iniciarSesion", async function(req, res){
    let datosUsuario = req.query; 
    let resultado = await servicioUsuarios.iniciarSesion(datosUsuario);
    res.send(resultado);
});

/*
    datosUsuario = {
        "nombre": xxxx,
        "usuario": xxxx,
        "clave": xxxx,
        "roles": ["A", "B"]
    }
*/
/**
 * CREAR NUEVO USUARIO
 */
controladorUsuarios.post("/crearUsuario", async function(req, res){
    let datosUsuario = req.body;
    let resultado = await servicioUsuarios.crearUsuario(datosUsuario);
    res.send(resultado);
})

module.exports = controladorUsuarios;