const express = require("express");
const router = express.Router();
const testController = require("../controllers/test");

/**
 * GET /
 * Ping to check if the server is up
 */
router.get("/ping", testController.ping);

module.exports = router;
