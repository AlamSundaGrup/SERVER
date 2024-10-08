const express = require("express");
const UserController = require("../controllers/UserController");
const userRouter = express.Router();

userRouter.post("/login", UserController.googleLogin);
userRouter.post("/register", UserController.googleLogin);
userRouter.post("/google-login", UserController.googleLogin);

module.exports = userRouter;
