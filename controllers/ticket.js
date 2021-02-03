const { outputHandler } = require("../utils/middlewares");
const ticketService = require("../services/ticket");

const getTicket = async (req, res) => {
  try {
    // Get data from request
    const { userId, expiresIn } = req.body;

    // Set expiry to requested days
    const expiresAt = new Date() + expiresIn;

    const {
      result,
      success,
      statusCode,
      message,
    } = await ticketService.create({ user: userId, expiresAt: expiresAt });

    outputHandler(result, success, statusCode, message, res);
  } catch (error) {
    outputHandler(error, false, 400, "An error occured", res);
  }
};

module.exports = {
  getTicket,
};
