const Router = require("express");
const {tokenValidation} = require("../lib/validateToken"); 
const { createEvent, updateEvent, deleteEvent, getEventById, getEventList, futureEvents, getCategority } = require("../controllers/event.controllers");
const router = Router();


router
    .post("/",tokenValidation,createEvent)
    .put("/delete/:id",tokenValidation,deleteEvent)
    .put("/update/:id",tokenValidation,updateEvent)
    .get("/futureEvents",futureEvents)
    .get("/categority",getCategority)
    .get("/",getEventList)
    .get("/:id",getEventById)
module.exports = router