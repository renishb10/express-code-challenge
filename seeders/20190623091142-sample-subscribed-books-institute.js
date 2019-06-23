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
          BookId: 2,
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
