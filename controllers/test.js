const { outputHandler } = require("../utils/middlewares");

const ping = async (req, res) => {
  try {
    outputHandler("pong", true, 200, "Ping successful", res);
  } catch (err) {
    outputHandler("pong", false, 400, "Ping failed", res);
  }
};

module.exports = {
  ping,
};
