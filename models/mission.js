'use strict';
module.exports = (sequelize, DataTypes) => {
  const mission = sequelize.define('mission', {
    equipe: DataTypes.STRING
  }, {});
  mission.associate = function(models) {
    // associations can be defined here
  };
  return mission;
};