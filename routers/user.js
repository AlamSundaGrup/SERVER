const express = require("express");
const UserController = require("../controllers/UserController");
const user = express.Router();

user.post("/google-login", UserController.googleLogin);

module.exports = user;
