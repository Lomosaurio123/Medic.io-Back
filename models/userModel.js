const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');


const Schema = mongoose.Schema;

const userSchema = new Schema({

    email : {
        type : String,
        required : true,
        unique : true //Solo dejar registrar una vez ese correo
    },

    nombre : {
        type : String,
        required : true
    },

    apellidoPaterno : {
        type : String,
        required : true
    },

    apellidoMaterno : {
        type : String,
        required : true
    },

    edad : {
        type : Number,
        required : true
    },

    especialidad : {
        type : String,
        required : true
    },

    tel : {
        type : Number,
        required : true
    },

    password : {
        type : String,
        required : true
    }

});

// Metodo estatico para signup 

userSchema.statics.signup = async function(email, nombre, apellidoMaterno, apellidoPaterno, edad, especialidad, tel , password) {

    //Validation

    if( !email || !password ) {
        throw Error( 'Todos los campos deben estar llenos' );
    }

    if (!validator.isEmail(email)) {
        throw Error('Email not valid');
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough');
    }

    const exists = await this.findOne({ email });
    
    if( exists ) {
        throw Error( 'Email already in use' );
    }

    //Hash password

    const salt = await bcrypt.genSalt( 10 ); // agregar mas caracteres a la password para tener hashes diferentes
    const hash = await bcrypt.hash( password, salt ); //Hasheamos la password

    const user = await this.create( { email, nombre, apellidoMaterno, apellidoPaterno, edad, especialidad, tel, password : hash } ); //creamos el usuario

    return user;

}

//Metodo estatico para login

userSchema.statics.login = async function( email, password ) {

    if( !email || !password ) {
        throw Error( 'Todos los campos deben estar llenos' );
    }

    const user = await this.findOne({ email });

    if( !user ) {
        throw Error( 'Incorrect Email' );
    }

    const match = await bcrypt.compare( password, user.password );

    if( !match ) throw Error( 'Incorrect password' );

    return user;

}

module.exports = mongoose.model( 'User', userSchema )