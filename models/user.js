"use strict";
const { password } = require("pg/lib/defaults");
const { bcrypt, hashPassword } = require("../helpers/bycrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.user);
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: {
          msg: "Email already exist",
        },
        validate: {
          notEmpty: {
            msg: "Email is required",
          },
          notNull: {
            msg: "Email is required",
          },
          isEmail: {
            msg: "Invalid email format",
          }
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Password is required",
          },
          notNull: {
            msg: "Password is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: async (user, options) => {
          if (user.password) {
            user.password = hashPassword(user.password)
          }
        },
      },
    }
  );
  return User;
};
