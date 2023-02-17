const express = require('express');
const { createPaciente, getPaciente, getPacientes, deletePaciente, updatePaciente } = require('../controllers/pacienteController');

const requireAuth = require( '../middleware/requireAuth' );

const router = express.Router();

router.use(requireAuth); //proteger las demas rutas

//Obtener todos los pacientes
router.get('/', getPacientes);

//Obtener un solo paciente
router.get('/:id', getPaciente);

//Publicar paciente
router.post('/', createPaciente);

//Eliminar paciente

router.delete('/:id', deletePaciente );


//Actualizar paciente

router.post('/:id', updatePaciente);

// Exportar la ruta

module.exports = router;