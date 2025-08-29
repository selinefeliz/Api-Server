const mysql = require('mysql2');
const config = require('../../../backend/config');

const dbconfig = {
  host: config.DB_HOST,
  user: config.user,
  password: config.password,
  database: config.database
};

let conexion;

function conMysql() {
  conexion = mysql.createConnection(dbconfig);

  conexion.connect((err) => {
    if (err) {
      console.error('[db error]', err);
      setTimeout(conMysql, 2000); // dale más tiempo para reconectar
    } else {
      console.log('✅ DB conectada');
    }
  });

  conexion.on('error', err => {
    console.error('[db error]', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      conMysql();
    } else {
      throw err;
    }
  });
}
conMysql();

// para traer los valores mediante el SP
function getAreasSP() {
  return new Promise((resolve, reject) => {
    conexion.query('CALL getAreas()', (error, results) => {
      if (error) return reject(error);
      resolve(results[0]);
    });
  });
}
//aqui espera un idarea 
function getRolesSP(idArea) {
  return new Promise((resolve, reject) => {
    conexion.query('CALL getRoles(?)', [idArea], (error, results) => {
      if (error) return reject(error);
      resolve(results[0]);
    });
  });
}


module.exports = { getAreasSP, getRolesSP};
