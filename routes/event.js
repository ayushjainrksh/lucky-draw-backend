const express = require("express");
const router = express.Router();

// Local dependencies
const eventController = require("../controllers/event");

/**
 * Create a new event
 */
router.post("/", eventController.create);

module.exports = router;
