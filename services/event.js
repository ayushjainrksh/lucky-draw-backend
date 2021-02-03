const Event = require("../models/event");
const { resultHandler } = require("../utils/middlewares");

const create = async (body) => {
  try {
    const event = await Event.create(body);

    if (event) {
      return resultHandler(event, true, 201, "Event created successfully!");
    } else {
      return resultHandler({}, false, 400, "Event could not be created!");
    }
  } catch (error) {
    return resultHandler(
      error,
      false,
      400,
      "An error occured while creating the event!"
    );
  }
};

module.exports = {
  create,
};
