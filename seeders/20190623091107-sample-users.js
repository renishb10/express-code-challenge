'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'renishb10@edgehill.ac.uk',
          password: 'password123',
          name: 'Renish Bhaskaran',
          role: 'student',
          InstitutionId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'winston@cardiff.ac.uk',
          password: 'password123',
          name: 'Winston Churchill',
          role: 'student',
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
