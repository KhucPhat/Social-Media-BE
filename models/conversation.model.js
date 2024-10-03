const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    parparticipants: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    messages: {
        type: Schema.Types.ObjectId,
        ref: "Message",
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model("conversation", conversationSchema);