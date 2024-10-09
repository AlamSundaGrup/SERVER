require("dotenv").config();
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

  static async getProfileByToken(req, res, next) {
    try {
      const { token } = req.params;

      const payload = verifyToken(token);
      const user = await User.findByPk(payload.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({
        userName: user.userName,
        email: user.email,
        profilePicture: user.profilePicture,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
