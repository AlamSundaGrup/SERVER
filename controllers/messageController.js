const { verifyToken } = require("../helpers/jwt");
const { Message, User, Profile } = require("../models");

class MessageController {
  static async createMessage(message, token) {
    try {
      const res = verifyToken(token);

      let currentUser = await User.findByPk(res.id);

      let ProfileId = currentUser.id;

      const newMessage = await Message.create({ message, ProfileId });
      return newMessage;
    } catch (error) {
      console.log(error);
    }
  }

  static async getMessages() {
    try {
      const messages = await Message.findAll({
        include: {
          model: Profile,
          attributes: ["displayName", "profilePicture"],
        }
      });

      return messages;
    } catch (error) {
      console.log(error);
    }
  }

  static async getAllMessages(req, res, next) {
    try {
      const messages = await Message.findAll({
        include: {
          model: Profile,
          attributes: ["displayName", "profilePicture"],
        }
      });

      res.json(messages);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MessageController;
