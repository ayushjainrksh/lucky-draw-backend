const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticket");

router.post("/", ticketController.getTicket);

module.exports = router;
