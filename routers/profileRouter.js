const express = require("express");
const ProfileController = require("../controllers/profileController");
const authorization = require("../middlewares/authorization");

const profileRouter = express.Router();

profileRouter.get("/", ProfileController.getProfiles);
profileRouter.post("/",authorization, ProfileController.createProfile);

profileRouter.get("/:id", ProfileController.getProfileById);
profileRouter.put("/:id", ProfileController.updateProfile);

module.exports = profileRouter;
