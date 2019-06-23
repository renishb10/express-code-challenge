'use strict';
module.exports = (sequelize, DataTypes) => {
  const SubscriberBook = sequelize.define(
    'SubscriberBook',
    {
      bookId: DataTypes.STRING,
      institutionId: DataTypes.STRING,
    },
    {},
  );
  SubscriberBook.associate = function(models) {
    // associations can be defined here
  };
  return SubscriberBook;
};
