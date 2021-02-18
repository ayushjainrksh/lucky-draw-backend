const schedule = require("node-schedule");

const Event = require("../models/event");
const Ticket = require("../models/ticket");
const { resultHandler } = require("../utils/middlewares");

const create = async (body) => {
  try {
    const event = await Event.create(body);

    if (event) {
      // Schedule a lucky draw at the given time
      const job = schedule.scheduleJob(body.scheduledAt, async () => {
        const updatedEvent = await Event.findById(event.id);

        // Get random participant and declare as winner of the lucky draw
        updatedEvent["participants"][
          Math.floor(Math.random() * updatedEvent["participants"].length)
        ].isWinner = true;
        updatedEvent.save();

        console.log("Results announced!");
      });

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
    const events = await Event.find().populate({
      path: "participants",
      populate: { path: "ticket" },
    });

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
      "name scheduledAt prizes"
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

const enter = async (body) => {
  try {
    const ticket = await Ticket.find({ user: body.userId, isUsed: false })
      .sort({ expiresIn: 1 })
      .limit(1);

    if (ticket.length) {
      const { user, isUsed } = ticket;

      if (isUsed) {
        return resultHandler(
          {},
          false,
          405,
          "Ahh sorry! Ticket has already been used."
        );
      }

      // Get event in which user wants to participate
      const event = await Event.findById(body.eventId).populate({
        path: "participants",
        populate: { path: "ticket" },
      });

      // Check if event has already ended
      if (event.scheduledAt < new Date()) {
        return resultHandler({}, false, 400, "Event has already ended!");
      }

      // Update the participants' list
      event["participants"].push({
        ticket: ticket[0]._id,
        participatedAt: new Date(),
      });
      await event.save();

      // Update ticket status
      ticket[0]["isUsed"] = true;
      await ticket[0].save();

      return resultHandler(event, true, 201, "Participated successfully!");
    } else {
      return resultHandler(
        {},
        false,
        400,
        "Get some tickets to enter the event!"
      );
    }
  } catch (error) {
    return resultHandler(
      error,
      false,
      400,
      "An error occured while entering the event!"
    );
  }
};

module.exports = {
  create,
  getAll,
  getUpcoming,
  enter,
};
