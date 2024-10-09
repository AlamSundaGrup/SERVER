"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      Message.belongsTo(models.Profile);
    }
  }
  Message.init(
    {
      ProfileId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Profile ID is required",
          },
          notNull: {
            msg: "Profile ID is required",
          },
        },
        references: {
          model: "Profiles",
          key: "id",
        },
      },
      message: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Message is required",
          },
          notNull: {
            msg: "Message is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Message",
    }
  );
  return Message;
};
