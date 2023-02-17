const jwt = require( 'jsonwebtoken' )
const User = require( '../models/userModel' )

const requireAuth = async ( req, res, next ) => {

    // Verificar Auth
    
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]; //Obtenemos el token del header de la peticion

    try {

        const { _id } = jwt.verify( token, process.env.SECRET ); //Obtener el id del token
        
        req.user = await User.findOne({ _id }).select('_id'); //Verificar que el id corresponde al del usuario
        next();

    } catch (error) {

        console.log( error );
        res.status(401).json( { error : 'La peticion no esta autorizada' } )

    }

}


module.exports = requireAuth;