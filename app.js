/*
    IMPORTAR MÓDULOS REQUERIDOS
*/
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const controladorPeliculas = require('./api/peliculas/controller');
const controladorUsuarios = require('./api/usuarios/controller');
const database = require('./database/connection');
require('dotenv').config();

/*
    INICIAR LA CONFIGURACIÓN
*/
const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan(process.env.MORGAN_MODE));

/*
    INICIAR LAS RUTAS.
*/
app.use("/api/peliculas", controladorPeliculas);
app.use("/api/usuarios", controladorUsuarios);

/*
    CONFIGURAR LA CARPETA PÚBLICA.
*/
// /apipelicuas_53844/public = __dirname
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

app.get("/", function(req, res){
    res.sendFile( path.join(__dirname+'./index.html'));
});

/*
    CONFIGURAR EL PUERTO  QUE VA A MONITOREAR EL API.
*/
database.conectar()
    .then(function(){
        app.listen(port, function(){
            console.log("API Ejecutándose en el puerto " + port);
        });
    })
    .catch(function(error){
        console.log(error);
    });