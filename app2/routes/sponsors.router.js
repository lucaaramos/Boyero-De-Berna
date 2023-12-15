const express = require("express");
const { tokenValidation } = require("../lib/validateToken");
const { createSponsor, getSponsors, getSponsorById, deleteSponsor, updtateSponsor, getSponsorsAleatory } = require("../controllers/sponsors.controllers");

const router = express.Router();


router 
        .post("/create",tokenValidation,createSponsor)
        .get("/getListSponsors",getSponsors)
        .get("/getSponsors/:id",getSponsorById)
        .get("/getSponsorsAleatory/:amount",getSponsorsAleatory)
        .delete("/delete/:id",tokenValidation,deleteSponsor)
        .put("/update/:id",tokenValidation,updtateSponsor)

module.exports = router