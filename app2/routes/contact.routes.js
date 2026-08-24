const Router = require("express");
const { sendContact } = require("../controllers/contact.controllers");

const router = Router();

router.post("/", sendContact);

module.exports = router;
