const {Conversation} = require("../models/models");

exports.findOne = async (senderId, receiverId) => Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
});
exports.create = async (senderId, receiverId) => Conversation.create({
    participants: [senderId, receiverId],
});