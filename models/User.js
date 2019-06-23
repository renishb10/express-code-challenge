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
        },
      },
      password: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: {
            args: [6, 100],
            msg: 'Password must be with at least 6 chars but not more than 100',
          },
        },
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: {
            args: [2, 50],
            msg: 'Name must be with at least 2 chars but not more than 50',
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
              'Role must be of these types "student", "academic", "administrator"',
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

  // Hashing the password
  User.comparePassword = (encodedPassword, password) => {
    return bcrypt.compareSync(password, encodedPassword);
  };

  // associations can be defined here
  User.associate = function(models) {
    User.belongsTo(models.Institution);
  };

  return User;
};
