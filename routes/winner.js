const express = require("express");
const router = express.Router();

// Local dependencies
const winnerController = require("../controllers/winner");

/**
 * GET /
 * List all winners
 */
router.get("/", winnerController.getAll);

/**
 * GET /recent
 * List winners of the last week
 */
router.get("/recent", winnerController.getRecent);

module.exports = router;
