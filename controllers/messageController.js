const { Message } = require('../models');

exports.createMessage = async (req, res, next) => {
  try {
    let {id} = req.user
    const { message } = req.body;
    const newMessage = await Message.create({ message, ProfileId : id });

    res.status(201).json({
        message : newMessage.message
    });
  } catch (error) {
    next(error);
  }
};

exports.getMessages = async (req, res, next) => {
  try {
    const messages = await Message.findAll();
    if(!messages) throw { name: "NotFound" };

    res.status(200).json(messages);
  } catch (error) {
    next(error)
  }
};
