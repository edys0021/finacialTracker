'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expenditure extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Expenditure.belongsTo(models.Users, {foreignKey: 'userId'})
    }
  };
  Expenditure.init({
    userId: DataTypes.INTEGER,
    item: DataTypes.STRING,
    price: DataTypes.INTEGER,
    type: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Expenditure',
  });
  return Expenditure;
};