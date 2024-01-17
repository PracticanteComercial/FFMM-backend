'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FFMMs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      agf: {
        type: Sequelize.STRING
      },
      run: {
        type: Sequelize.STRING
      },
      series: {
        type: Sequelize.STRING
      },
      money: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      monthly: {
        type: Sequelize.STRING
      },
      ytd: {
        type: Sequelize.STRING
      },
      yearly: {
        type: Sequelize.STRING
      },
      rescueability: {
        type: Sequelize.STRING
      },
      riskLevel: {
        type: Sequelize.STRING
      },
      bylawLink: {
        type: Sequelize.STRING
      },
      dataSheetLink: {
        type: Sequelize.STRING
      },
      invertLink: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('FFMMs');
  }
};