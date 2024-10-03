const { Conversation } = require("../models/models");

exports.findOneConversation = async (senderId, receiverId) =>
  Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

exports.findOneByMessage = async (senderId, messageId) =>
  Conversation.findOne({
    participants: { $all: [senderId, messageId] },
  }).populate("messages");

exports.createConversation = async (senderId, receiverId) =>
  Conversation.create({
    participants: [senderId, receiverId],
  });
