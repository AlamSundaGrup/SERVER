"use strict";
const { Model, HasMany } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.hasMany(models.Message);
      Profile.belongsTo(models.User);
    }
  }
  Profile.init(
    {
      displayName: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "displayName is required",
          },
          notNull: {
            msg: "displayName is required",
          },
        },
      },
      profilePicture: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue:
          "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_1280.png",
      },
      UserId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "User ID is required",
          },
          notNull: {
            msg: "User ID is required",
          },
        },
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );
  return Profile;
};
