'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    hole: DataTypes.INTEGER
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};