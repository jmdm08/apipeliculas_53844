const jwt = require('jsonwebtoken');
require('dotenv').config();

function generarToken(datos){
    // ID, ROLES, NOMBRE
    let payload = {
        "id" : datos._id,
        "nombre": datos.nombre,
        "roles" : datos.roles
    }

    const token = jwt.sign(payload, process.env.JWT_CLAVE, {expiresIn: process.env.JWT_EXPIRES});

    return token;
}

// MIDLEWARE -> CAPUTRAR LA PETICIÓN Y VALIDAR EL TOKEN.
function validarToken(req, res, next){
 
    let token = undefined;

    // CABECERA DE LA PETICIÓN -> authorization.
    if(req.headers['authorization']){
        // BEAR TOKEN -> seperar por el espacion y capturar el token
        token = req.headers['authorization'].split(" ").pop();
        
        if(token){
            jwt.verify(token, process.env.JWT_CLAVE, function(error, decoded){
                if(error){
                    res.status(401).send({"mensaje":"Token inválido"});                
                }
                else{
                    req.usuario = decoded;
                    next();
                }
            });
        }
        else{
            res.status(403).send({"mensaje":"No autorizado"});
        }
    }
    else{
        res.status(401).send({"mensaje": "Sin token"});
    }
}

module.exports.generarToken = generarToken;
module.exports.validarToken = validarToken;