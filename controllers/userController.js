const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

//Hacemos la funcion para crear el token

const createToken = (_id) => {
    return jwt.sign( { _id }, process.env.SECRET, { expiresIn : '3d' } );
}

//Login user

const loginUser = async ( req, res ) => {

    const { email, password } = req.body

    
    try {

        const user = await User.login( email, password );

        //Creamos el token
        const token = createToken( user._id );

        res.status( 200 ).json( { email, token } );
        
    } catch ( error ) {

        res.status( 400 ).json( { error : error.message } );

    }

}

//Signup user

const signupUser = async ( req, res ) => {

    const { email, nombre, apellidoPaterno, apellidoMaterno, edad, especialidad, tel , password } = req.body;

    try {

        const user = await User.signup( email, nombre, apellidoPaterno, apellidoMaterno, edad, especialidad, tel , password );

        //Creamos el token
        const token = createToken( user._id );

        res.status( 200 ).json( { email, token } );
        
    } catch ( error ) {

        res.status( 400 ).json( { error : error.message } );

    }

}


module.exports = {
    loginUser,
    signupUser
};