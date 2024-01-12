'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FFMMs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FFMMs.init({
    name: DataTypes.STRING,
    agf: DataTypes.STRING,
    run: DataTypes.STRING,
    series: DataTypes.STRING,
    money: DataTypes.STRING,
    type: DataTypes.STRING,
    monthly: DataTypes.STRING,
    ytd: DataTypes.STRING,
    yearly: DataTypes.STRING,
    rescueability: DataTypes.STRING,
    rickLevel: DataTypes.STRING,
    bylawLink: DataTypes.STRING,
    dataSheetLink: DataTypes.STRING,
    invertLink: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FFMMs',
  });
  return FFMMs;
};