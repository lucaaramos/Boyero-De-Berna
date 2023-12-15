const Router = require("express");
const {getAllNoticias, AgregarNoticia, DeleteNew, UpdateNew, getById} = require("../controllers/news.controllers"); 
const { verify } = require("jsonwebtoken");
const { tokenValidation } = require("../lib/validateToken");
const router = Router();


router
    
.get("/",getAllNoticias)
.get("/:id",getById)
.post("/",tokenValidation,AgregarNoticia)
.put("/delete/:id",tokenValidation, DeleteNew)
.put("/:id", tokenValidation, UpdateNew)
    

module.exports = router