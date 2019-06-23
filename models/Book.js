'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    'Book',
    {
      isbn: {
        // There are two types (ISBN-10 & ISBN-13)
        // We should decide - either store just numbers or with dashes
        // TODO: Business logic that converts 10 to 13 by adding "978"
        // TODO: Robust validation for ISBN, since this is crucial piece for the app
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [10, 13],
            msg: 'ISBN must be 10 digits or 13 digits',
          },
        },
      },
      title: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          len: {
            args: [2, 200],
            msg:
              'Book Title must be with at least 2 chars but not more than 200',
          },
        },
      },
      author: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          len: {
            args: [2, 100],
            msg:
              'Book Author Name must be with at least 2 chars but not more than 100',
          },
        },
      },
    },
    {
      // Indexing done here
      indexes: [{ unique: false, fields: ['author'] }],
    },
  );

  // associations can be defined here
  Book.associate = function(models) {
    Book.belongsToMany(models.Institution, { through: 'SubscriberBooks' });
  };

  return Book;
};
