const mongoose = require("mongoose");
const { Schema } = mongoose;

const EventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
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
        isWinner: {
          type: Boolean,
          default: false,
        },
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
