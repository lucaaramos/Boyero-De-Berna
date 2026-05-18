const jwt = require('jsonwebtoken');
require('dotenv').config();

// Datos del usuario que solicita el restablecimiento de contraseña
const userId = 123; // Cambia esto por el ID del usuario
const secretKey = process.env.JWT_PASSWORD_RESET_SECRET || 'change-me-reset-secret';

// Generar el token
const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });

console.log('Token generado:', token);
