'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasMany(models.Expenditure, {foreignKey: 'userId'})
    }
  };
  Users.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (users, options) => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(users.password, salt);
        users.password = hash;
      },
    },
    sequelize,
    modelName: 'Users',
  });
  return Users;
};