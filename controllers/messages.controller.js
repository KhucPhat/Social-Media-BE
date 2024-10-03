const messagesModel = require("../models/messages.model");
const { conversationService } = require("../services/services");
const { getReceiverSocketId } = require("../socket/socket");
const apiResponse = require("../utils/apiResponse");

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await conversationService.findOneConversation(
      senderId,
      receiverId
    );

    console.log(conversation);
    if (!conversation) {
      conversation = await conversationService.createConversation(
        senderId,
        receiverId
      );
    }

    const newMessage = new messagesModel({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // this will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    // SOCKET IO FUNCTIONALITY WILL GO HERE
    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return apiResponse.successResponseWithData(
      res,
      "Send message successfuly",
      newMessage
    );
  } catch (error) {
    return apiResponse.errorResponse(res, error.message);
  }
};

const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await conversationService.findOneByMessage(
      senderId,
      userToChatId
    );

    if (!conversation)
      return apiResponse.successResponseWithData(res, "successfully", []);

    const messages = conversation.messages;

    return apiResponse.successResponseWithData(res, "successfully", messages);
  } catch (error) {
    return apiResponse.errorResponse(res, error.message);
  }
};

module.exports = {
  sendMessage,
  getMessages,
};
