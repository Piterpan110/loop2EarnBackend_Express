'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate(models) {
      // define association here
    }
  }
  Token.init(
    {
      accesstoken: DataTypes.STRING,
      refreshtoken: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Token'
    }
  );
  return Token;
};
