require("dotenv").config();
const { where } = require("sequelize");
const { comparePassword } = require("../helpers/bycrypt");
const { createToken, verifyToken } = require("../helpers/jwt");
const { User } = require("../models");
const { Profile } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

class UserController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const newUser = await User.create({
        email,
        password,
      });

      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw { name: "Email is required" };
      if (!password) throw { name: "Password is required" };

      const user = await User.findOne({ where: { email } });
      if (!user) throw { name: "Invalid email or password" };

      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) throw { name: "Invalid email or password" };

      const payload = {
        id: user.id,
      };

      const access_token = await createToken(payload);

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const { google_token } = req.headers;

      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          userName: payload.name,
          email: payload.email,
          password: String(Math.random() * 10000),
        },
        hooks: false,
      });

      const access_token = await createToken({ id: user.id });
      res.json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async validateProfile(req, res, next) {
    try {
      const { id } = req.user;

      const profile = await Profile.findOne({
        where: { UserId: id },
      });
      if (!profile)
        throw { name: "Profile not found, please create your profile first" };

      res.json({
        id: profile.id,
      });
    } catch (error) {
      next(error);
    }
  }

  static async validateUser(req, res, next) {
    try {
      const { id } = req.user;

      const user = await User.findByPk(id);
      if (!user) res.json({ message: "User not found" });

      res.json({ id: user.id });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
