/*
    IMPORTAR MÓDULOS REQUERIDOS
*/
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const controladorPeliculas = require('./api/peliculas/controller');
const controladorUsuarios = require('./api/usuarios/controller');
const conexion = require('./database/connection');
require('dotenv').config();

/*
    INICIAR LA CONFIGURACIÓN
*/
const app = express();
const port = process.env.PORT;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan(process.env.MORGAN_MODE));

/*
    INICIAR LAS RUTAS.
*/
app.use("/api/peliculas", controladorPeliculas);
app.use("/api/usuarios", controladorUsuarios);

/*
    CONFIGURAR EL PUERTO  QUE VA A MONITOREAR EL API.
*/
conexion.conectar()
    .then(function(){
        app.listen(port, function(){
            console.log("API Ejecutándose en el puerto " + port);
        });
    })
    .catch(function(error){
        console.log(error);
    });   