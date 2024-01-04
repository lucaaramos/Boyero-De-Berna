
const sharp = require("sharp")
const conn = require("../config/config")
const helperImg = (filePath,filename,size = 300)=>{
    return sharp(filePath)
        .resize(size)
        .toFile(`../app2/optimize/${filename}`)
}


const img = async(req,res)=>{
    const {file} = req
    const {id} = req.params
    try{
        helperImg(file.path,`resize-${file.filename}`,150)
        helperImg(file.path,`large-${file.filename}`,500)
        conn.query(`UPDATE events SET image = "/large-${file.filename}" where id='${id}'`,(err,resp)=>{
            if(err) res.status(404).json({err})
            res.status(200).send("img load")
        })
    }catch(e){
        res.status(400).send(e)
    }
} 


const imgSponsors = async(req,res)=>{
    const {file} = req
    const {id} = req.params
    try{
        helperImg(file.path,`resize-${file.filename}`,150)
        helperImg(file.path,`large-${file.filename}`,500)
        conn.query(`UPDATE sponsors SET image = "/large-${file.filename}" where id='${id}'`,(err,resp)=>{
            if(err) res.status(404).json({err})
            res.status(200).send("img load")
        })
    }catch(e){
        res.status(400).send(e)
    }
} 
const imgNews = async(req,res)=>{
    const {file} = req
    const {id} = req.params
    try{
        helperImg(file.path,`resize-${file.filename}`,150)
        helperImg(file.path,`large-${file.filename}`,500)
        conn.query(`UPDATE news SET image = "/large-${file.filename}" where id='${id}'`,(err,resp)=>{
            if(err){
               return res.status(404).json({err})
            } 
            res.status(200).send("img load")
        })
    }catch(e){
        res.status(400).send(e)
    }
} 
// const imgNews = async (req, res) => {
//     const { file } = req;
//     const { id } = req.params;

//     try {
//         // Procesamiento de imágenes
//         const largeFilename = `large-${file.filename}`;
//         const resizeFilename = `resize-${file.filename}`;
        
//         // Aquí se realiza el procesamiento de las imágenes utilizando helperImg
//         await helperImg(file.path, largeFilename, 500);
//         await helperImg(file.path, resizeFilename, 150);

//         // Actualización en la base de datos
//         conn.query(`UPDATE news SET image = "/${largeFilename}" WHERE id = '${id}'`, (err, resp) => {
//             if (err) {
//                 return res.status(500).json({ error: "Error en la actualización de la base de datos" });
//             } 
//             res.status(200).json({ message: "Imagen cargada y base de datos actualizada correctamente" });
//         });
//     } catch (error) {
//         // Manejo de errores
//         console.error("Error durante el procesamiento de imágenes o la actualización en la base de datos:", error);
//         res.status(500).json({ error: "Error interno del servidor" });
//     }
// };


module.exports = {
    img,
    imgSponsors,
    imgNews
}