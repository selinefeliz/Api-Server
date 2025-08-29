const express = require('express');
const respuesta = require('../red/respuestas');
const router = express.Router();
const controlador = require('./controlador');

// Ruta para traer todas las áreas
router.get('/areas', async (req, res) => {
  try {
    const items = await controlador.getAreasSP();
    respuesta.success(req, res, items, 200);
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
});

// Ruta para traer todos los roles indicar el area
router.get('/roles/:idArea', async (req, res) => {
  try {
    const idArea = req.params.idArea; // obtenemos el parámetro de la URL
    const items = await controlador.getRolesSP(idArea);
    respuesta.success(req, res, items, 200);
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
});


module.exports = router;
