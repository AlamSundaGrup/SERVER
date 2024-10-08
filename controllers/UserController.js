const { User } = require("../models");
// const { comparePassword, hashPassword } = require("../helpers/bcrypt");

const { OAuth2Client } = require("google-auth-library");
// const { where } = require("sequelize");
// const { signToken, verifyToken } = require("../helpers/jwt");
// const { imgbox } = require("imgbox");

const client = new OAuth2Client();

class UserController {
  static async googleLogin(req, res, next) {
    try {
      const { google_token } = req.headers;
      console.log(google_token);

      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      //   cek ke db sendiri apakah user tersebutsudah terdaftar apa belom?
      //    kalau belom kita daftarin dulu, lalu lanjut login
      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          userName: payload.name,
          email: payload.email,
          password: String(Math.random() * 10000),
        },
      });
      //   kalau udah, lanjut login (generate token jwt biasa)
      const access_token = signToken({ id: user.id });
      console.log(user, created);
      res.status(200).json({ access_token });
      //   const userId = payload["sub"];
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getProfileByToken(req, res, next) {
    try {
      const { token } = req.params;
      console.log("Token from params:", token);

      const payload = verifyToken(token);
      const user = await User.findByPk(payload.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
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
