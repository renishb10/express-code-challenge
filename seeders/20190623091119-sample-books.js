'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Books',
      [
        {
          isbn: '98723487991234',
          title: 'Tuesday with Morrie',
          author: 'Someone',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          isbn: '987463454591234',
          title: 'Hello World - Python',
          author: 'David John',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          isbn: '9872348796565655',
          title: 'That awesome',
          author: 'Kipling',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  },
};
