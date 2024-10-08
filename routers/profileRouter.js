const express = require("express");
const ProfileController = require("../controllers/profileController");

const profileRouter = express.Router();

profileRouter.get("/", ProfileController.getProfiles);
profileRouter.post("/", ProfileController.createProfile);

profileRouter.get("/:id", ProfileController.getProfileById);
profileRouter.put("/:id", ProfileController.updateProfile);

module.exports = profileRouter;
