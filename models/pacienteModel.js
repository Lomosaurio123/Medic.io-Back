const mongoose = require( 'mongoose' );

const Schema = mongoose.Schema

const pacientesSchema = new Schema({

    nombre : {
        type : String,
        required : true
    },

    apellidoMaterno : {
        type : String,
        required : true
    },

    apellidoPaterno : {
        type : String,
        required : true
    },

    edad : {
        type : Number,
        required : true
    },

    email : {
        type : String, 
        required : true
    },

    tel : {
        type : Number,
        required : true
    },

    CURP : {
        type : String,
        required : true
    },

    tipoSangre : {
        type : String,
        required : true
    },

    peso : {
        type : Number,
        required : true
    },

    user_id : {

        type : String,
        required : true

    }

}, { timestamps : true } );


module.exports = mongoose.model('Paciente', pacientesSchema);