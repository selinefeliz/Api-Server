//para tener acceso a la base de datos, desde aqui podemos cambiar de base de datos
const db = require('../DB/mysql'); //aqui cambiamos de base de datos


//funcion para traer todos los datos de la tabla
function getAreasSP(){
    return db.getAreasSP();
}

function getRolesSP(idArea) {
  return db.getRolesSP(idArea);
}

//exportar la funcion
module.exports = {
    getAreasSP,getRolesSP
};
