const express = require("express");
const UserController = require("../controllers/UserController");
const authentication = require("../middlewares/authentication");
const userRouter = express.Router();

userRouter.post("/login", UserController.login);
userRouter.post("/register", UserController.register);
userRouter.post("/google-login", UserController.googleLogin);
userRouter.get("/validateUser", UserController.validateUser);
userRouter.get("/validateProfile", authentication, UserController.validateProfile);

module.exports = userRouter;
