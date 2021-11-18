const bcrypt = require('bcrypt');
const modeloUsuarios = require('./model');
const jwt = require('../auth/jwt');
require('dotenv').config();

async function crearUsuario(datosUsuario){
    /*
        1. Objeto no vacío.
        2. Existan las llaves -> usuario, clave
        
        datosUsuario = {
            "nombre": xxxx,
            "usuario": xxxx,
            "clave": xxxx,
            "roles": ["A", "B"]
        }
    */
    let resultado = {};
    if(datosUsuario && Object.keys(datosUsuario).length > 0){
        if(datosUsuario.usuario && datosUsuario.clave){
            let claveEncriptada = bcrypt.hashSync(datosUsuario.clave, parseInt(process.env.ENC_SALTROUNDS));
            datosUsuario.clave = claveEncriptada;
            let resultadoCrear = await modeloUsuarios.crearUno(datosUsuario);
            if(resultadoCrear && resultadoCrear.acknowledged){
                resultado.mensaje = "Usuario creado correctamente";
                resultado.datos = resultadoCrear;
            }
            else{
                resultado.mensaje = "No se pudo crear el usuario";
                resultado.datos = datosUsuario;
            }
        }
        else{
            resultado.mensaje = "Usuario y Clave deben existir";
            resultado.datos = datosUsuario;
        }
    }
    else{
        resultado.mensaje = "No hay datos";
    }
    return resultado;
}

async function iniciarSesion(datosUsuario){
    let resultado = {};
    if(datosUsuario && Object.keys(datosUsuario).length > 0 && datosUsuario.usuario && datosUsuario.clave){
        let usuario = await modeloUsuarios.buscarUnoUsuario(datosUsuario.usuario);
        if(usuario){
            let claveEncriptada = usuario.clave;
            let esValida = bcrypt.compareSync(datosUsuario.clave, claveEncriptada);
            if(esValida){
                resultado.mensaje = "Inicio de sesión de correcto";
                let token = jwt.generarToken(usuario);
                delete usuario.clave;
                resultado.datos = usuario;
                resultado.token = token;
            }
            else{
                resultado.mensaje = "Usuario o Clave incorrectos";
                resultado.datos = datosUsuario;
            }
        }
        else{
            resultado.mensaje = "Usuario o Clave incorrectos";
            resultado.datos = datosUsuario;
        }
    }
    else{
        resultado.mensaje = "Datos inválidos";
        resultado.datos = datosUsuario;
    }
    return resultado;
}

module.exports.crearUsuario = crearUsuario;
module.exports.iniciarSesion = iniciarSesion;