'use strict';
module.exports = (sequelize, DataTypes) => {
  const SubscriberBook = sequelize.define(
    'SubscriberBook',
    {
      BookId: DataTypes.STRING,
      InstitutionId: DataTypes.STRING,
    },
    {},
  );
  SubscriberBook.associate = function(models) {
    // associations can be defined here
  };
  return SubscriberBook;
};
