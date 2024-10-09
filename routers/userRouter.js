const express = require("express");
const UserController = require("../controllers/UserController");
const userRouter = express.Router();

userRouter.post("/login", UserController.login);
userRouter.post("/register", UserController.register);
userRouter.post("/google-login", UserController.googleLogin);

module.exports = userRouter;
