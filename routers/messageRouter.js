const express = require("express");
const MessageController = require("../controllers/messageController");
const messageRouter = express.Router();

messageRouter.get("/", MessageController.getAllMessages);

module.exports = messageRouter;
