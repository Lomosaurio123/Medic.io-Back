require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const pacientesRoutes = require('./routes/pacientes');
const bitacorasRoutes = require('./routes/bitacoras');
const userRoutes = require('./routes/users');

const app = express();

//Conexión a la base

const connectionDB = require('./connection')

// Configuracion de middlewares

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Configurar las rutas

app.use( '/api/pacientes' , pacientesRoutes);
app.use( '/api/bitacoras', bitacorasRoutes );
app.use( '/api/user', userRoutes );

// Configurar puerto
app.listen( 4000, () => {
    console.log( 'Servidor montado' );
} );


