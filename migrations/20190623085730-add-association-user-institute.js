'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Reference Link
    // https://medium.com/@andrewoons/how-to-define-sequelize-associations-using-migrations-de4333bf75a7
    return queryInterface.addColumn('Users', 'InstitutionId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Institutions',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'InstitutionId');
  },
};
