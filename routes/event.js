const express = require("express");
const router = express.Router();

// Local dependencies
const eventController = require("../controllers/event");

/**
 * POST /
 * Create a new event
 */
router.post("/", eventController.create);

/**
 * GET /
 * List all events
 */
router.get("/", eventController.getAll);

/**
 * GET /upcoming
 * List latest event
 */
router.get("/upcoming", eventController.getUpcoming);

/**
 * POST /:id/enter
 * Enter an event with id
 */
router.post("/:id/enter", eventController.enter);

module.exports = router;
