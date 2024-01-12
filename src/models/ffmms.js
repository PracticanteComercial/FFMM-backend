'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FFMMs extends Model {
    static associate(models) {
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