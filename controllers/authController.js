const { user } = require("../models");
const bcrypt = require("bcrypt");
const req = require("express/lib/request");
const jwt = require("jsonwebtoken");

exports.register = register = async (req, res) => {
  try {
    const { email, passseod } = req.body;
    const hashedPassword = await bcrypt.hashSync(passseod, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
