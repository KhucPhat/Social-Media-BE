const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const conversationSchema = new Schema(
  {
    parparticipants: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    messages: {
      type: mongoose.Schema.Types.Array,
      ref: "messages",
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("conversation", conversationSchema);
