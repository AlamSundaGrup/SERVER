const { Message } = require("../models");

class MessageController {
  static async createMessage(req, res, next) {
    try {
      const { message, ProfileId } = req.body;
      const newMessage = await Message.create({ message, ProfileId });

      res.status(201).json(newMessage);
    } catch (error) {
      next(error);
    }
  }

  static async getMessages(req, res, next) {
    try {
      const messages = await Message.findAll();

      res.status(200).json(messages);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MessageController;