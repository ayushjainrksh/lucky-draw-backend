const { outputHandler } = require("../utils/middlewares");
const User = require("../models/user");

const ping = async (req, res) => {
  try {
    outputHandler("pong", true, 200, "Ping successful", res);
  } catch (err) {
    outputHandler("pong", false, 400, "Ping failed", res);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    outputHandler(users, true, 201, "Found users", res);
  } catch (error) {
    outputHandler(error, false, 400, "An error occured", res);
  }
};

module.exports = {
  ping,
  getUsers,
};
