'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Books',
      [
        {
          isbn: '9783161484100',
          title: 'Tuesday with Morrie',
          author: 'Mitch Albom',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          isbn: '9783161484101',
          title: 'Anna Karenina',
          author: 'Leo Tolstoy',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          isbn: '9783161484102',
          title: 'Madame Bovary',
          author: 'Gustave Flaubert',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          isbn: '9783161484103',
          title: 'War and Peace',
          author: 'Leo Tolstoy',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          isbn: '9783161484104',
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          isbn: '9783161484105',
          title: 'Lolita',
          author: 'Vladimir Nabokov',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          isbn: '9783161484106',
          title: 'Middlemarch',
          author: 'George Eliot',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          isbn: '9783161484107',
          title: 'The Adventures of Huckleberry Finn',
          author: 'Mark Twain',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          isbn: '9783161484108',
          title: 'The Stories of Anton Chekhov',
          author: 'Anton Chekhov',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          isbn: '9783161484109',
          title: 'In Search of Lost Time',
          author: 'Marcel Proust',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          isbn: '9783161484110',
          title: 'Hamlet',
          author: 'William Shakespeare',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          isbn: '9783161484111',
          title: 'Don Quixote',
          author: 'Miguel de Cervantes',
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
