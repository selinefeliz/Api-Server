const express = require('express');
const config = require('./config'); //./ se usa cuando esta en la misma carpeta
const rutas = require('../apiserver/src/modulos/rutas');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql')
const path =require('path');
// const areas = require('../apiserver/apiserver/src/modulos/rutas')

app.use(cors()); //cors es para permitir el acceso desde otros dominios
app.use(bodyParser.json()); // bodyParser es para poder recibir datos en formato json
// Servir archivos estáticos del frontend React

app.use(express.static(path.join(__dirname, 'apiserver', 'build')));

app.get('/', (req,res) => {
     res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
})



app.listen(config.PORT, config.Host, function () {
    console.log(`App listening on http://${config.HOST}:${config.PORT}`);
});

app.set('port', config.PORT || 3000);

//rutas de la API
app.use('/api', rutas)

module.exports = app;