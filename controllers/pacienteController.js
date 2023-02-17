const Paciente = require('../models/pacienteModel');
const mongoose = require('mongoose');

//Traemos a todos los pacientes

const getPacientes = async( req, res ) => {

    const user_id = req.user._id;

    const paciente = await Paciente.find({ user_id }).sort({ createdAt : -1 });

    res.status(200).json(paciente);
}

//Traer un solo paciente

const getPaciente = async( req, res ) => {
    const { id } = req.params

    if( !mongoose.Types.ObjectId.isValid(id) ) {
        return res.status(404).json( { error : 'No encontro pacientes' } )
    }

    const paciente = await Paciente.findById( id );

    if( !paciente ) {
        return res.status(400).json( { error : 'No hay pacientes' } );
    }

    res.status(200).json( paciente );
}

//Creamos el paciente

const createPaciente = async (req, res) => {

    const { nombre, apellidoMaterno, apellidoPaterno, edad, email, tel, CURP , tipoSangre, peso } = req.body;

    let empytFields = []; //Para realizar las validaciones para crear el paciente

    if( !nombre ) empytFields.push('Nombre');

    if( !apellidoMaterno ) empytFields.push('ApellidoMaterno');

    if( !apellidoPaterno ) empytFields.push('ApellidoPaterno');

    if( !edad ) empytFields.push('Edad');

    if( !email ) empytFields.push('Email');

    if( !tel ) empytFields.push('Tel');

    if( !CURP ) empytFields.push('CURP');

    if( !tipoSangre ) empytFields.push('TipodeSangre');

    if( !peso ) empytFields.push('Peso');

    if( empytFields.length > 0 ) {
        return res.status(400).json( { error : 'Please Fill in all the fields', empytFields } );
    }

    try {
        const user_id = req.user._id
        const paciente = await Paciente.create( { nombre, apellidoMaterno, apellidoPaterno, edad, email, tel, CURP , tipoSangre, peso, user_id } );
        res.status(200).json( paciente );
    } catch (error) {
        res.status(400).json({ error : error.message });
    }
}

//Eliminamos Paciente

const deletePaciente = async (req, res) => {

    const { id } = req.params

    if( !mongoose.Types.ObjectId.isValid(id) ) {
        return res.status(404).json( { error : 'No encontro pacientes' } )
    }

    const paciente = await Paciente.findOneAndDelete({ _id : id })

    if( !paciente ) {
        return res.status(400).json( { error : 'No hay pacientes' } );
    }

    return res.status(200).json( paciente );
    
}

//Modificar Paciente

const updatePaciente = async ( req, res ) => {

    const { id } = req.params

    if( !mongoose.Types.ObjectId.isValid(id) ) {
        return res.status(404).json( { error : 'No encontro pacientes' } )
    }

    const paciente = await Paciente.findOneAndUpdate( { _id : id }, {
        nombre : req.body.nombre,
        apellidoMaterno : req.body.apellidoMaterno,
        apellidoPaterno : req.body.apellidoPaterno,
        edad : req.body.edad,
        email : req.body.email,
        tel : req.body.tel,
        CURP : req.body.CURP,
        tipoSangre : req.body.tipoSangre,
        peso : req.body.peso,
    });

    if( !paciente ) {
        return res.status(400).json( { error : 'No hay pacientes' } );
    }

    return res.status(200).json( paciente );

}

//Exportamos el controlador

module.exports = {
    createPaciente,
    getPacientes,
    getPaciente,
    deletePaciente,
    updatePaciente
}