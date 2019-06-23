'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'SubscriberBooks',
      [
        {
          BookId: 1,
          InstitutionId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          BookId: 11,
          InstitutionId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          BookId: 2,
          InstitutionId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          BookId: 4,
          InstitutionId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          BookId: 5,
          InstitutionId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          BookId: 11,
          InstitutionId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          BookId: 3,
          InstitutionId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          BookId: 10,
          InstitutionId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SubscriberBooks', null, {});
  },
};
