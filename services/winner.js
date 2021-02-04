const Event = require("../models/event");
const { resultHandler } = require("../utils/middlewares");

const getAll = async () => {
  try {
    // Get all past event winners
    const events = await Event.find({
      scheduledAt: { $lt: new Date() },
      participants: { $elemMatch: { isWinner: true } },
    }).populate({
      path: "participants",
      populate: { path: "ticket" },
    });

    if (events) {
      const results = events.map((event) => {
        return event["participants"].filter(
          (participant) => participant.isWinner
        );
      });
      return resultHandler(results, true, 201, "Winners found successfully!");
    } else {
      return resultHandler({}, false, 404, "No event found!");
    }
  } catch (error) {
    console.log(error);
    return resultHandler(
      error,
      false,
      400,
      "An error occured while fetching the event!"
    );
  }
};

const getRecent = async () => {
  try {
    // Get current date
    const currentDate = new Date();

    // Set date to 1 week ago
    currentDate.setDate(currentDate.getDate() - 7);

    // Get all the past week's events
    const events = await Event.find({
      scheduledAt: { $lt: new Date(), $gt: currentDate },
      participants: { $elemMatch: { isWinner: true } },
    }).populate({
      path: "participants",
      populate: { path: "ticket" },
    });

    if (events) {
      // Filter winners from the participants in events
      const results = events.map((event) => {
        return event["participants"].filter(
          (participant) => participant.isWinner
        );
      });
      return resultHandler(
        results,
        true,
        201,
        "Winners in last 1 week found successfully!"
      );
    } else {
      return resultHandler({}, false, 404, "No event found in last 1 week!");
    }
  } catch (error) {
    console.log(error);
    return resultHandler(
      error,
      false,
      400,
      "An error occured while fetching the events!"
    );
  }
};

module.exports = {
  getAll,
  getRecent,
};
