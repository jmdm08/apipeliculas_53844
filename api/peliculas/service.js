const modeloPeliculas = require('./model');

/**
    SERVICIO -> LÓGICA DEL API
        -> RECIBIR DATOS DEL CONTROLADOR
        -> MANIPULAR LOS DATOS -> TRANSFORMARLO POR MEDIO DE OPERACIONES LÓGICAS Y MATEMÁTICAS.
            -> CONSULTAR EN EL MODELO DATOS DE LA BASE DE DATOS.
            -> ENVIAR AL MODELO DATOS PARA ALMACENAR
        -> ENVIAR AL CONTROLADOR DATOS PARA LA RESPUESTA DE LA PETICIÓN
*/

async function obtenerPeliculas(){
    let peliculas = await modeloPeliculas.obtenerTodas();
    /*
        OPERACIONES ADICIONALES.
    */
    return peliculas;
}

async function obtenerPelicula(id){
    let pelicula = await modeloPeliculas.obtenerUna(id);
    return pelicula;
}

async function obtenerPeliculasPorTitulo(titulo){
    let peliculas = await modeloPeliculas.obtenerPorTitulo(titulo);
    return peliculas;
}

async function crearPelicula(datos){

    let resultado = {};
    if(datos && Object.keys(datos).length > 0){
       let resConsulta = await modeloPeliculas.crearUna(datos);
            if(resConsulta && resConsulta.acknowledged){
                resultado.mensaje= "Pelicula Creada correctamente"
                resultado.datos = resConsulta.insertedId
         }
         else{
             resultado.mensaje = "error al crear la pélicula",
             resultado.datos = datos
         }
    }
    else{
        resultado.mensaje = "No se puede crear la pelicula"
        resultado.datos =   "No hay datos"
    }
    return resultado;
}

module.exports.obtenerPeliculas = obtenerPeliculas;
module.exports.obtenerPelicula = obtenerPelicula;
module.exports.obtenerPeliculasPorTitulo = obtenerPeliculasPorTitulo;
module.exports.crearPelicula = crearPelicula;