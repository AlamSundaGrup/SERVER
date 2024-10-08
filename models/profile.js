'use strict';
const {
  Model,
  HasMany
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.hasMany(models.message)
      Profile.belongsTo(models.user,{foreignKey:"userId"})
    }
  }
  Profile.init({
    displayName: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:"displayName is required"
        },
        notNull:{
          msg:"displayName is required"
        }
      }
    },
    profilePicture: {
      type:DataTypes.STRING,
      defaultValue: "https://cdn.pixabay.com/photo/2021/07/25/08/03/account-6491185_1280.png"
    },
    userId: {
      type:DataTypes.INTEGER,
      validate:{
        notEmpty:{
          msg:"userId is required"
        },
        notNull:{
          msg:"userId is required"
        }
      },
      references:{
        model: "Users",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};