const Bitacoras = require('../models/bitacorasModel');
const mongoose = require('mongoose');

//Traemos a todos las bitacoras

const getBitacoras = async( req, res ) => {

    const user_id = req.user._id;

    const bitacoras = await Bitacoras.find({ user_id }).sort({ createdAt : -1 });

    res.status(200).json(bitacoras);
}

//Traer una sola bitacora

const getBitacora = async( req, res ) => {

    const { id } = req.params

    if( !mongoose.Types.ObjectId.isValid(id) ) {
        return res.status(404).json( { error : 'No encontro bitacoras' } )
    }

    const bitacora = await Bitacoras.findById( id );

    if( !bitacora ) {
        return res.status(400).json( { error : 'No existe la bitacora' } );
    }

    res.status(200).json( bitacoran );
}

//Creamos la bitacora

const createBitacora = async (req, res) => {

    const { titulo, descripcion, paciente_id } = req.body;

    let empytFields = []; //Para realizar las validaciones para crear la bitacora

    if( !titulo ) empytFields.push( 'Titulo' );

    if( !descripcion ) empytFields.push( 'Descripcion' );

    if( !paciente_id ) empytFields.push( 'Paciente Id' );

    if( empytFields.length > 0 ) {
        return res.status(400).json( { error : 'Please Fill in all the fields', empytFields } );
    }

    try {
        const user_id = req.user._id
        const bitacora = await Bitacoras.create( { titulo, descripcion, paciente_id, user_id } );
        res.status(200).json( bitacora );
    } catch (error) {
        res.status(400).json({ error : error.message });
    }
}

//Eliminamos bitacora

const deleteBitacora = async (req, res) => {

    const { id } = req.params

    if( !mongoose.Types.ObjectId.isValid(id) ) {
        return res.status(404).json( { error : 'No encontro bitacora' } )
    }

    const bitacora = await Bitacoras.findOneAndDelete({ _id : id })

    if( !bitacora ) {
        return res.status(400).json( { error : 'No hay bitacoras' } );
    }

    return res.status(200).json( bitacora );
    
}

//Modificar Bitacora

const updateBitacora = async ( req, res ) => {

    const { id } = req.params

    if( !mongoose.Types.ObjectId.isValid(id) ) {
        return res.status(404).json( { error : 'No encontro bitacora' } )
    }

    const bitacora = await Bitacoras.findOneAndUpdate( { _id : id }, {
        titulo : req.body.titulo,
        descripcion : req.body.descripcion,
        paciente_id : req.body.paciente_id
    });

    if( !bitacora ) {
        return res.status(400).json( { error : 'No hay bitacoras' } );
    }

    return res.status(200).json( bitacora );

}

//Exportamos el controlador

module.exports = {
    createBitacora,
    getBitacoras,
    getBitacora,
    deleteBitacora,
    updateBitacora
}