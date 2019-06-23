'use strict';
module.exports = (sequelize, DataTypes) => {
  const SubscriberBook = sequelize.define('SubscriberBook', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    role: DataTypes.STRING
  }, {});
  SubscriberBook.associate = function(models) {
    // associations can be defined here
  };
  return SubscriberBook;
};