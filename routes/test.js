// TODO: Remove before it goes to production

const express = require("express");
const router = express.Router();
const testController = require("../controllers/test");

/**
 * GET /
 * Ping to check if the server is up
 */
router.get("/ping", testController.ping);

/**
 * GET /users
 * List all users
 */
router.get("/users", testController.getUsers);

module.exports = router;
