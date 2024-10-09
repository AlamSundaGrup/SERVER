const { verifyToken } = require("../helpers/jwt");
const { Message, User } = require("../models");

class MessageController {
  static async createMessage(message, token) {
    try {
      const res = verifyToken(token);

      console.log(res, "<<<<<<<<");
      

      let currentUser = await User.findByPk(res.id);

      let ProfileId = currentUser.id;

      const newMessage = await Message.create({ message, ProfileId });
    } catch (error) {
      console.log(error);
    }
  }

  static async getMessages() {
    try {
      const messages = await Message.findAll();

      return messages;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = MessageController;
