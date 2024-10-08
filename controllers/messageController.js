const { Message } = require('../models');

exports.createMessage = async (req, res) => {
  try {
    const { message, ProfileId } = req.body;
    const newMessage = await Message.create({ message, ProfileId });

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
