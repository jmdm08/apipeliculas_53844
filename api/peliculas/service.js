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
        // TODO: VALIDAR SI LA PELÍCULA EXISTE...

        let resConsulta = await modeloPeliculas.crearUna(datos);
        if(resConsulta && resConsulta.acknowledged){
            resultado.mensaje = "Película creada correctamente",
            resultado.datos = resConsulta.insertedId
        }
        else{
            resultado.mensaje = "Error al crear la película",
            resultado.datos = datos
        }
    }
    else{
        resultado.mensaje = "No se puede crear la película"
        resultado.datos = "No hay datos"
    }
    
    return resultado;
}

async function actualizarPelicula(id, datos){
    let resultado = {};
    if(id && id.length == 24){
        if(datos && Object.keys(datos).length > 0){
            if(datos.titulo && datos.titulo !== ""){
                let resConsulta = await modeloPeliculas.actualizarUna(id, datos);
                if(resConsulta && resConsulta.acknowledged){
                    resultado.mensaje = "Película actualizada correctamente";
                    resultado.datos = resConsulta;
                }
                else{
                    resultado.mensaje = "Error al actualizar película";
                    resultado.datos = resConsulta;
                }
            }
            else{
                /*
                    OPERADOR TERNARIO
                        -> condicion ? verdadero : falso
                */
                resultado.mensaje = "Título vacío o no existe";
                resultado.datos = !datos.titulo ? "Título no existe" : "";
            }
        }
        else{
            resultado.mensaje = "No hay datos";
            resultado.datos = datos;
        }
    }
    else{
        resultado.mensaje = "ID inválido...";
        resultado.datos = id;
    }

    return resultado;
}

module.exports.obtenerPeliculas = obtenerPeliculas;
module.exports.obtenerPelicula = obtenerPelicula;
module.exports.obtenerPeliculasPorTitulo = obtenerPeliculasPorTitulo;
module.exports.crearPelicula = crearPelicula;
module.exports.actualizarPelicula = actualizarPelicula;