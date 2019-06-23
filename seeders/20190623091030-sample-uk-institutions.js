'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Institutions',
      [
        {
          name: 'Cardiff University',
          url: 'https://www.cardiff.ac.uk',
          emailDomain: 'cardiff.ac.uk',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Coventry University',
          url: 'https://www.coventry.ac.uk',
          emailDomain: 'coventry.ac.uk',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Edge Hill University',
          url: 'https://www.edgehill.ac.uk',
          emailDomain: 'edgehill.ac.uk',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Imperial College London',
          url: 'https://www.imperial.ac.uk',
          emailDomain: 'imperial.ac.uk',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Keele University',
          url: 'https://www.keele.ac.uk',
          emailDomain: 'keele.ac.uk',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Lancaster University',
          url: 'https://www.lancaster.ac.uk',
          emailDomain: 'lancaster.ac.uk',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'London Business School',
          url: 'https://www.london.edu',
          emailDomain: 'london.edu',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Institutions', null, {});
  },
};
