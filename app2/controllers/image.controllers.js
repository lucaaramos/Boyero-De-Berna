
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

module.exports = {
    img,
    imgSponsors,
    imgNews
}