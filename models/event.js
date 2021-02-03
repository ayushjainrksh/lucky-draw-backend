const mongoose = require("mongoose");
const { Schema } = mongoose;

const EventSchema = new Schema(
  {
    participants: [
      {
        ticket: {
          type: Schema.Types.ObjectId,
          ref: "Ticket",
          required: true,
        },
        participatedAt: {
          type: Date,
          required: true,
        },
        isWinner: false,
      },
    ],
    scheduledAt: {
      type: Date,
      required: true,
    },
    prizes: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = Event = mongoose.model("Event", EventSchema);