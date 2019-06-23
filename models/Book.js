'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    'Book',
    {
      isbn: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [10, 13],
            msg: 'ISBN number should be 10 digits or 13 digits',
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
              'Please provide a Book Title with at least 2 chars but not more than 200',
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
              'Please provide a Author Name with at least 2 chars but not more than 100',
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
