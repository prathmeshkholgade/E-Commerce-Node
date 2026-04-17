'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     * 
     * 
     */

    await queryInterface.removeConstraint("Reviews", "reviews_ibfk_2");

    await queryInterface.addConstraint("Reviews", {
      fields: ["productId"],
      type: "foreign key",
      name: "reviews_ibfk_2",
      references: {
        table: "products",
        field: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"

    })


  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
