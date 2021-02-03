const { outputHandler } = require("../utils/middlewares");
const eventService = require("../services/event");

const create = async (req, res) => {
  try {
    // Get data from request
    const { scheduledAt, prizes } = req.body;

    const { result, success, statusCode, message } = await eventService.create({
      scheduledAt,
      prizes,
    });

    outputHandler(result, success, statusCode, message, res);
  } catch (error) {
    outputHandler(error, false, 400, "An error occured", res);
  }
};

module.exports = {
  create,
};
