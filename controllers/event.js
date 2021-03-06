const { outputHandler } = require("../utils/middlewares");
const eventService = require("../services/event");

const create = async (req, res) => {
  try {
    // Get data from request
    const { name, scheduledAt, prizes } = req.body;

    const { result, success, statusCode, message } = await eventService.create({
      name,
      scheduledAt,
      prizes,
    });

    outputHandler(result, success, statusCode, message, res);
  } catch (error) {
    outputHandler(error, false, 400, "An error occured", res);
  }
};

const getAll = async (req, res) => {
  try {
    const {
      result,
      success,
      statusCode,
      message,
    } = await eventService.getAll();

    outputHandler(result, success, statusCode, message, res);
  } catch (error) {
    outputHandler(error, false, 400, "An error occured", res);
  }
};

const getUpcoming = async (req, res) => {
  try {
    const {
      result,
      success,
      statusCode,
      message,
    } = await eventService.getUpcoming();

    outputHandler(result, success, statusCode, message, res);
  } catch (error) {
    outputHandler(error, false, 400, "An error occured", res);
  }
};

const enter = async (req, res) => {
  const { userId } = req.body;
  const eventId = req.params.id;

  try {
    const { result, success, statusCode, message } = await eventService.enter({
      userId,
      eventId,
    });

    outputHandler(result, success, statusCode, message, res);
  } catch (error) {
    outputHandler(error, false, 400, "An error occured", res);
  }
};

module.exports = {
  create,
  getAll,
  getUpcoming,
  enter,
};
