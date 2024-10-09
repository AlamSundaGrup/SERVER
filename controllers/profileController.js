const { Profile } = require("../models");

class ProfileController {
  static async createProfile(req, res, next) {
    try {
let { id } = req.user;

      const { displayName, profilePicture } = req.body;
      const newProfile = await Profile.create({
        displayName,
        profilePicture,
        UserId : id,
      });

      res.status(201).json(newProfile);
    } catch (error) {
      next(error);
    }
  }

  static async getProfiles(req, res, next) {
    try {
      const profiles = await Profile.findAll();
      res.status(200).json(profiles);
    } catch (error) {
      next(error);
    }
  }

  static async getProfileById(req, res, next) {
    try {
      const id = +req.params.id;
      const profile = await Profile.findByPk(id);

      if (!profile) throw { name: "ProfileNotFound" };

      res.status(200).json(profile);
    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(req, res, next) {
    try {
      const { displayName, profilePicture } = req.body;

      const id = +req.params.id;
      const profile = await Profile.findByPk(id);
      if (!profile) throw { name: "NotFound" };

      const newProfile = await Profile.update(
        {
          ...req.body,
        },
        {
          where: { id },
        }
      );
      res.status(200).json(profile);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProfileController;
