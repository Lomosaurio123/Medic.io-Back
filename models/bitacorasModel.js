const mongoose = require( 'mongoose' );

const Schema = mongoose.Schema

const userSchema = new Schema({

    titulo : {

        type : String,
        required : true

    },

    descripcion : {

        type : String,
        required : true

    },

    paciente_id : {

        type : String,

    },

    user_id : {

        type : String,
        required : true

    }

}, { timestamps : true } );


module.exports = mongoose.model('bitacora', userSchema);