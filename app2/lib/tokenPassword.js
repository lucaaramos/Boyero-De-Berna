const jwt = require('jsonwebtoken');

// Datos del usuario que solicita el restablecimiento de contraseña
const userId = 123; // Cambia esto por el ID del usuario
const secretKey = 'clave-segura'; // Cambia esto por una clave secreta más segura

// Generar el token
const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });

console.log('Token generado:', token);
