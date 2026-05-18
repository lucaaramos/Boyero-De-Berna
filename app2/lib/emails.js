const nodemailer = require('nodemailer')
require('dotenv').config();


const sendEmail = () => {
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            // service: 'gmail',
            secure: true, 
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                type: "OAuth2",
                user: 'lucaramos99@gmail.com',
                password: 'woew pqpg akko wivi',
                clientId: "67881110567-qdokov1685fqdpjnh05rkggevjo68phd.apps.googleusercontent.com",
            clientSecret: "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",
            redirectUri: "TU_REDIRECT_URI",
            }
        });
       
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error al enviar el correo electrónico", error);
                return reject({message: "Error al enviar el correo"});
            } 
            return resolve({message: "Error al enviar el correo"});
            
        });
    })
}

const mailSettings = {
    sendEmail, 
    transporter: nodemailer.createTransport({
        // service: 'gmail',
        secure: true, 
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            type: "OAuth2",
            user: "lucaramos99@gmail.com",
            password: 'woew pqpg akko wivi',
            clientId: "495541058252-67kgtitkn5bmv38eoho4ahq6v166mtte.apps.googleusercontent.com",
            clientSecret: "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",
            redirectUri: "TU_REDIRECT_URI",
        }
    }),
    recoveryPassword: (email, token) => {
        return {
            from: process.env.EMAIL,
            to: email,
            subject: 'Restablecimiento de Contraseña',
            text: `Haz clic en este enlace para restablecer tu contraseña ${process.env.URL}/${token}/restore`
        }
    }
}

module.exports = mailSettings