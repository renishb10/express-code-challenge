'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      // Required Field Attributes
      email: {
        type: DataTypes.STRING(255), // Email Id maximum length is 255 chars
        unique: true,
        allowNull: false,
        validate: {
          isEmail: {
            msg: 'Please provide a valid Email address',
          },
          len: {
            args: [6, 255],
            msg:
              'Please provide a Email address with at least 6 chars but not more than 255',
          },
        },
      },
      password: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: {
            args: [2, 50],
            msg:
              'Please provide a Name with at least 2 chars but not more than 50',
          },
        },
      },
      role: {
        type: DataTypes.ENUM('student', 'academic', 'administrator'),
        allowNull: false,
        validate: {
          isIn: {
            args: [['student', 'academic', 'administrator']],
            msg:
              'Please provide a Role of any these types "student", "academic", "administrator"',
          },
        },
      },
      InstitutionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      // Indexing done here
      indexes: [{ unique: true, fields: ['email'] }],
      hooks: {
        beforeCreate: user => {
          const salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt);
        },
      },
    },
  );

  // Encrypt the password
  User.comparePassword = (encodedPassword, password) => {
    return bcrypt.compareSync(password, encodedPassword);
  };

  // associations can be defined here
  User.associate = function(models) {
    User.belongsTo(models.Institution);
  };

  return User;
};
