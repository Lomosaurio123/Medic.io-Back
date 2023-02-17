const express = require('express');
const { createBitacora, getBitacora, getBitacoras, deleteBitacora, updateBitacora } = require('../controllers/bitacoraController');

const requireAuth = require( '../middleware/requireAuth' );

const router = express.Router();

router.use(requireAuth); //proteger las demas rutas

//Obtener todos las bitacoras
router.get('/', getBitacoras);

//Obtener una sola bitacora
router.get('/:id', getBitacora);

//Publicar bitacora
router.post('/', createBitacora);

//Eliminar bitacora

router.delete('/:id', deleteBitacora );

//Actualizar bitacora

router.post('/:id', updateBitacora);

// Exportar la ruta

module.exports = router;