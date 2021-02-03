const express = require("express");
const router = express.Router();

// Local dependencies
const ticketController = require("../controllers/ticket");

/**
 * Generate a new raffle ticket
 */
router.post("/", ticketController.getTicket);

module.exports = router;
