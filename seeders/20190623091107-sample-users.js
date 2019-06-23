'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'renishb10@gmail.com',
          password: 'password123',
          name: 'Renish',
          role: 'student',
          InstitutionId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'bhaskaran.ape@gmail.com',
          password: 'password321',
          name: 'Bhaskaran',
          role: 'administrator',
          InstitutionId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
