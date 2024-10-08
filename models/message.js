'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Message.belongsTo(models.profile, {foreignKey:"profileId"})
    }
  }
  Message.init({
    profileId: {
      type:DataTypes.INTEGER,
      validate:{
        notEmpty:{
          msg:"profileId is required"
        },
        notNull:{
          msg:"profileId is required"
        }
      },
      references:{
        model: "Profiles",
        key: "id"
      }
    },
    message: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:"message is required"
        },
        notNull:{
          msg:"message is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};