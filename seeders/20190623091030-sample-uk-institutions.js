'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Institutions',
      [
        {
          name: 'University of Oxford',
          url: 'http://www.oxford.com',
          emailDomain: 'oxford.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'University of Cambridge',
          url: 'http://www.cambridge.com',
          emailDomain: 'cambridge.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'University of Bristol',
          url: 'http://www.bristol.com',
          emailDomain: 'bristol.com',
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
