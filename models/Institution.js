'use strict';
module.exports = (sequelize, DataTypes) => {
  const Institution = sequelize.define(
    'Institution',
    {
      // Required Field Attributes
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          len: {
            args: [2, 100],
            msg:
              'Please provide a Name with at least 2 chars but not more than 100',
          },
        },
      },
      url: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          isUrl: {
            msg: 'Please provide a valid URL',
          },
        },
      },
      emailDomain: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [4, 100],
            msg:
              'Please provide a Email Domain with at least 4 chars but not more than 100',
          },
        },
      },
    },
    {
      // Indexing done here
      indexes: [{ unique: true, fields: ['email'] }],
    },
  );

  // associations can be defined here
  Institution.associate = function(models) {
    Institution.belongsToMany(models.Book, { through: 'SubscriberBooks' });
  };

  return Institution;
};
