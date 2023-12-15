const Router = require("express");
const { createParticipant,getParticipantByEventId,getParticipantsByCategority, getParticipantByEventIdWithGroup, getAllParticipants } = require("../controllers/eventParticipants.controller");
const router = Router();

router
    .post("/:id_events/:category_id",createParticipant)
    .get("/eventsByGroup/:eventId",getParticipantByEventIdWithGroup)
    .get("/events/:eventId",getParticipantByEventId)
    .get("/categority/:eventId/:idCategority",getParticipantsByCategority)
    .get("/", getAllParticipants);
module.exports = router