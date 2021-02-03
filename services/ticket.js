const Ticket = require("../models/ticket");
const { resultHandler } = require("../utils/middlewares");

const create = async (body) => {
  try {
    const ticket = await Ticket.create(body);
    console.log(ticket);

    if (ticket) {
      return resultHandler(ticket, true, 201, "Ticket created successfully!");
    } else {
      return resultHandler({}, false, 400, "Ticket could not be created!");
    }
  } catch (error) {
    return resultHandler(
      error,
      false,
      400,
      "An error occured while creating the ticket!"
    );
  }
};

module.exports = {
  create,
};
