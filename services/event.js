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

const getAll = async () => {
  try {
    const events = await Event.find();

    if (events) {
      return resultHandler(events, true, 201, "Events found successfully!");
    } else {
      return resultHandler({}, false, 404, "No event found!");
    }
  } catch (error) {
    return resultHandler(
      error,
      false,
      400,
      "An error occured while fetching the event!"
    );
  }
};

const getUpcoming = async () => {
  try {
    // Sort in ascending order of event timing and get the first record
    const event = await Event.find(
      { scheduledAt: { $gt: new Date() } },
      "scheduledAt prizes"
    )
      .sort({ scheduledAt: 1 })
      .limit(1);

    if (event) {
      return resultHandler(event, true, 201, "Event found successfully!");
    } else {
      return resultHandler({}, false, 404, "No upcoming event!");
    }
  } catch (error) {
    return resultHandler(
      error,
      false,
      400,
      "An error occured while fetching the event!"
    );
  }
};

module.exports = {
  create,
  getAll,
  getUpcoming,
};
