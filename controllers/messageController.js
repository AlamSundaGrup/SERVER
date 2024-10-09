const { verifyToken } = require("../helpers/jwt");
const { Message } = require("../models");

class MessageController {
  static async createMessage(message, token) {
    try {
      const res = verifyToken(token);

      let currentUser = await User.findOne({
        where: {
          email: res.email,
        },
      });

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
