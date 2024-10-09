"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Message.belongsTo(models.Profile, { foreignKey: "ProfileId" });
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
