const Router = require("express");
const { login, register, dogsOfUser, requestPassword, getUsers, resertToken, resetPasswordd } = require("../controllers/user.controllers");
const {tokenValidation} = require("../lib/validateToken") 
const router = Router();


router
    .post("/login",login)
    .post("/register",register)
    .get("/dogofuser",tokenValidation,dogsOfUser)
    .post("/request-password", requestPassword)
    .get("/", getUsers)
    // .post("/tokenPassword/:token", resetPassword)
    .post("/tokenPassword/:token", resetPasswordd)
module.exports = router