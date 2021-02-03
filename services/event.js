const Event = require("../models/event");
const Ticket = require("../models/ticket");
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

const enter = async (body) => {
  try {
    const ticket = await Ticket.findById(body.ticketId);

    if (ticket) {
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

      // Check if user has already pariticipated with another ticket in the same event
      if (
        event["participants"].find(
          (participant) => participant.ticket.user.toString() == user.toString()
        )
      ) {
        return resultHandler(
          {},
          false,
          405,
          "Already participated! You cannot participate again."
        );
      } else {
        // Update the participants' list
        event["participants"].push({
          ticket: body.ticketId,
          participatedAt: new Date(),
        });
        await event.save();

        // Update ticket status
        ticket["isUsed"] = true;
        await ticket.save();

        return resultHandler(event, true, 201, "Participated successfully!");
      }
    } else {
      return resultHandler({}, false, 400, "Invalid ticket!");
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
  getAll,
  getUpcoming,
  enter,
};
