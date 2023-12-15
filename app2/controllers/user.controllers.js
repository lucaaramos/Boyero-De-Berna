const { query } = require("express");
const conn = require("../config/config")
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer")
const { OAuth2Client } = require('google-auth-library');

const register = (req,res)=>{
    const {name,password,email} = req.body
    const querySearchUserSQL = `SELECT * FROM users WHERE email = '${email}'`
    const queryIntroSQL = `INSERT INTO users (status,name, password, email,type) VALUES (1,"${name}","${password}", "${email}","client")`
    try{
        if(name.length || password.length || email.length){
        conn.query(querySearchUserSQL, function(err,result){
            if(err) res.status(500).send(err)
            if(result.length) return res.status(201).send("have an user created with this email: "+ email)
            conn.query(queryIntroSQL, function(err,result1){
            return res.status(200).send(true)
            })
        })}else{
            res.status(202).send("missing data")
        }
    }catch(e){
        res.status(400).send(e)
    }
}

const getUsers = (req, res) => {
    try{
        conn.query(
            "SELECT * FROM users;",
            (error, results) => {
                if (error) throw error;
                console.log(results);
                res.status(200).send({users: results});
                },
        )
        
    }catch(err){
        res.status(400).send(err)
    }

  };
  

const login = (req,res)=>{
    const {email, password} = req.body
    const querySearchUserSQL = `SELECT * FROM users WHERE email = '${email}'`
    try{
        conn.query(querySearchUserSQL,function(err,result){
            if(err) res.status(500).send(err);
            if(!result) return res.status(201).send("this user don't exist")
            const passwordCorrect = result[0]?.password === password
            if(!(result[0] && passwordCorrect)){
                res.status(401).send("invalid user or password")
            }else{
            const {name,email,type,id} = result[0]
            const userForToken = {
                id,
                name,
                email,
                type
            }
            const data ={
                ...result[0],
                type
            }
            const token = jwt.sign(userForToken, "tokenseguro123")
            console.log(token)
            res.header("token", token).status(200).json({
                result:data,
                token
            })}
        })
    }catch(e){
        res.status(400).send(e)
    }
}

const dogsOfUser = (req,res)=>{
    const { user } = req
    const dogOfUser = `SELECT * FROM events_participants WHERE id_user = '${user.id}'`
    try{
        conn.query(dogOfUser,function(err,result){
            if(err) res.status(500).send(err);
            console.log(result)
            const data = result.filter((item, index, arr) => {
                return arr.findIndex((elem) => elem.registration_number === item.registration_number) === index;
              });
        res.status(200).json({
            result:data,
            
        })}
    )
    }catch(e){
        res.status(400).send(e)
    }
}
// Función para actualizar el token de acceso
async function refreshAccessToken(refreshToken) {
    try {
        const oAuth2Client = new OAuth2Client({
            clientId: "67881110567-qdokov1685fqdpjnh05rkggevjo68phd.apps.googleusercontent.com",
            clientSecret: "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",
            redirectUri: "TU_REDIRECT_URI",
        });

        const { tokens } = await oAuth2Client.refreshToken(refreshToken);
        return tokens.access_token; // Nuevo token de acceso
    } catch (error) {
        console.error('Error al actualizar el token:', error);
        throw error;
    }
}
const requestPassword = async (req, res) => {
    let { email } = req.body;
    // Verifica si el correo existe
    const querySearchEmail = `SELECT * FROM users WHERE email = ?`;
    conn.query(querySearchEmail, [email], async (err, results) => {
        if (err) {
            console.log('Error al buscar al usuario', err);
            return res.status(500).json({ message: "Error del servidor" });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "No se encontró un usuario con ese correo" });
        }

        // Genera un token único y seguro
        const userID = results[0].id;
        const token = jwt.sign({ userID }, 'clave-segura');
        console.log(token);

        // Almacena el token en la tabla 'password_reset_tokens'
        const querySaveToken = `INSERT INTO password_reset_tokens (token, user_id) VALUES (?,?)`;
        conn.query(querySaveToken, [token, userID], async (error) => {
            try{
            if (error) {
                console.log("Error al guardar el token", error);
                return res.status(500).json({ message: "Error del servidor" });
            }
                const newAccessToken = await refreshToken('1//04PNgbPKtQQRGCgYIARAAGAQSNwF-L9IrfRn8KtvFft31kj3hcAjKQ2JoCYS_iOQnWqTvnefY_P_esBLy8QFhxGOC5PQfe3KC5ng')
                
                // Enviar correo electrónico para restablecer contraseña
                var transporter = nodemailer.createTransport({
                    // service: 'gmail',
                    // auth: {
                    //     type: 'OAuth2',
                    //     user: process.env.EMAIL,
                    //     accessToken: newAccessToken, 
                    //     clientId: "67881110567-qdokov1685fqdpjnh05rkggevjo68phd.apps.googleusercontent.com",
                    //     clientSecret: "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",
                    //     refreshToken: "1//04PNgbPKtQQRGCgYIARAAGAQSNwF-L9IrfRn8KtvFft31kj3hcAjKQ2JoCYS_iOQnWqTvnefY_P_esBLy8QFhxGOC5PQfe3KC5ng"
                    service: 'gmail',
                 secure: true, 
                 host: "smtp.gmail.com",
                 auth: {
                     type: "OAuth2",
                     user: process.env.EMAIL,
                     password: process.env.PASSWORD,
                     clientId: "67881110567-qdokov1685fqdpjnh05rkggevjo68phd.apps.googleusercontent.com",
                     clientSecret: "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",
                     refreshToken: "1//04PNgbPKtQQRGCgYIARAAGAQSNwF-L9IrfRn8KtvFft31kj3hcAjKQ2JoCYS_iOQnWqTvnefY_P_esBLy8QFhxGOC5PQfe3KC5ng",
                    },
                });
                
                var mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: 'Restablecimiento de Contraseña',
                    text: `Haz clic en este enlace para restablecer tu contraseña ${process.env.URL}/user/tokenPassword/${token}`
                };
                
                transporter.sendMail(mailOptions, (error) => {
                    if(error){
                        console.log("error al enviar en mail", error);
                        return res.status(500).json("error al enviar el correo")
                    }
                    console.log("correo enviado", mailOptions)
                    res.status(200).send(mailOptions);
                });
            }catch(err){
                return err
            }
        });
        });
    };
    
    // const requestPassword = (req, res) => {
//     let { email } = req.body;
    
//     // Verifica si el correo existe
//     const querySearchEmail = `SELECT * FROM users WHERE email = ?`;
//     conn.query(querySearchEmail, [email], (err, results) => {
//         if (err) {
//             console.log('Error al buscar al usuario', err);
//             return res.status(500).json({ message: "Error del servidor" });
//         }
//         if (results.length === 0) {
//             return res.status(404).json({ message: "No se encontró un usuario con ese correo" });
//         }
        
//         // Genera un token único y seguro
//         const userID = results[0].id;
//         const token = jwt.sign({ userID }, 'clave-segura'); 
//         console.log(token);

//         // Almacena el token en la tabla 'password_reset_token'
//         const querySaveToken = `INSERT INTO password_reset_tokens (token, user_id) VALUES (?,?)`;
//         conn.query(querySaveToken, [token, userID], function (error) {
//             if (error) {
//                 console.log("Error al guardar el token", error);
//                 return res.status(500).json({ message: "Error del servidor" });
//             }

//             // Enviar correo electrónico para restablecer contraseña
//             var transporter = nodemailer.createTransport({
//                 service: 'gmail',
//                 secure: true, 
//                 host: "smtp.gmail.com",
//                 auth: {
//                     type: "OAuth2",
//                     user: process.env.EMAIL,
//                     password: process.env.PASSWORD,
//                     clientId: "67881110567-qdokov1685fqdpjnh05rkggevjo68phd.apps.googleusercontent.com",
//                     clientSecret: "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",
//                     refreshToken: "1//04PNgbPKtQQRGCgYIARAAGAQSNwF-L9IrfRn8KtvFft31kj3hcAjKQ2JoCYS_iOQnWqTvnefY_P_esBLy8QFhxGOC5PQfe3KC5ng",
//                 }
//             });

//             var mailOptions = {
//                 from: "luca46594@gmail.com",
//                 to: email,
//                 subject: 'Restablecimiento de Contraseña',
//                 text: `Haz clic en este enlace para restablecer tu contraseña ${process.env.URL}/${token}/restore`
//             };
            
//             transporter.sendMail(mailOptions, (error) => {
//                 if (error) {
//                     console.log("Error al enviar el correo electrónico", error);
//                     return res.status(500).json("Error al enviar el correo");
//                 } 
//                 return res.status(200).json(token);
//             });
//         });
//     });
// };



        
        const resetPasswordd = (req, res) => {
            let { token } = req.params;
            const { password } = req.body;
        
            try {
                const payload = jwt.verify(token, "clave-segura");
                const queryToken = `SELECT * FROM password_reset_tokens WHERE user_id = ? AND token = ? AND status = 1`;
                
                
                conn.query(queryToken, [payload.userID, token], (err, result) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).send("Error en el servidor");
                    }
        
                    if (result.length && result[0].token === token) {
                        const query =  `UPDATE password_reset_tokens SET status = 0 WHERE user_id = ? AND status = 1`;
                        const queryPassword = `UPDATE users SET password = ? WHERE id = ? AND status = 1`;
                        
                        conn.query(query, [payload.userID], (err) => {
                            if (err) {
                                console.log(err)
                                return res.status(500).send(err);
                            }
                            conn.query(queryPassword, [password, payload.userID], (err) => {
                                if (err) {
                                console.log(err)
                                    return res.status(500).send("Error interno del servidor");
                                }
                                res.send('Contraseña actualizada');
                            });
                        });
                    } else {    
                        res.status(401).send('Token no válido');
                    }
                });
            } catch (err) {
                console.log(err);
                res.status(500).send('Error interno del servidor');
            }
        };
        // const resetPasswordd = (req,res) => {
//     let {token, userID} = req.params;
//     const {password} = req.body;
//     const payload = jwt.verify(token,"clave-segura") 
//     console.log(token)
//     try{
//         const queryToken = `SELECT * FROM password_reset_tokens where user_id = ${payload.userID} and status = 1`
//         conn.query(queryToken, (err,result)=>{
//             if(err){
//                 res.status(400).send(err,"error")
//             }
//             if(result.length && result[0].token === token){
//                 const query =  `UPDATE password_reset_tokens set status = 0 where user_id = ${payload.userID} and status=1`
//                 const queryPassword = `UPDATE user set password = ${password} where user_id = ${payload.userID} and status=1`
//                 conn.query(query)
//                 conn.query(queryPassword)
//             }
//             res.send('Contraseña actualizada', userID )
//         })
//     }catch(err){
//         console.log(err)
        
//     }
        
// }


module.exports = {
    register,
    login,
    dogsOfUser,
    requestPassword,
    getUsers,
    resetPasswordd

}