/*
    IMPORTAR MÓDULOS REQUERIDOS
*/
const express = require('express');
const bodyParser = require('body-parser');
const controladorPeliculas = require('./api/peliculas/controller');

/*
    INICIAR LA CONFIGURACIÓN
*/
const app = express();
const port = 3500;
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/*
    INICIAR LAS RUTAS.
*/
app.use("/api/peliculas", controladorPeliculas);

/*
    CONFIGURAR EL PUERTO  QUE VA A MONITOREAR EL API.
*/
app.listen(port, function(){
    console.log("API Ejecutándose en el puerto " + port);
});