const { user } = require("../models");
const bcrypt = require("bcrypt");
const req = require("express/lib/request");
const jwt = require("jsonwebtoken");

exports.register = register = async (req, res) => {
  try {
    const { email, password } = req.body;

    password = await bcrypt.hashSync(password, 10);
    const user = await User.create({
      email,
      password,
    });

    res.status(201).json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    next(error)
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if(!email) throw {name : "Email is required"};
    if(!password) throw {name : "Password is required"};
    


    const user = await User.findOne({ where: { email } });
    if (!user) throw {name: "InvalidEmail/Password"}

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw {name: "InvalidEmail/Password"}

    const access_token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.status(200).json({
      access_token
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
