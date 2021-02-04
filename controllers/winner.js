const { outputHandler } = require("../utils/middlewares");
const winnerService = require("../services/winner");

const getAll = async (req, res) => {
  try {
    const {
      result,
      success,
      statusCode,
      message,
    } = await winnerService.getAll();

    outputHandler(result, success, statusCode, message, res);
  } catch (error) {
    outputHandler(error, false, 400, "An error occured", res);
  }
};

const getRecent = async (req, res) => {
  try {
    const {
      result,
      success,
      statusCode,
      message,
    } = await winnerService.getRecent();

    outputHandler(result, success, statusCode, message, res);
  } catch (error) {
    outputHandler(error, false, 400, "An error occured", res);
  }
};

module.exports = {
  getAll,
  getRecent,
};
