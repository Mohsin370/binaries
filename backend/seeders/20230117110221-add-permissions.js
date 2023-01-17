'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Permissions', [{
            permission_name: 'VIEW_PRODUCT',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            permission_name: 'EDIT_PRODUCT',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            permission_name: 'DELETE_PRODUCT',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            permission_name: 'CREATE_PRODUCT',
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Permissions', null, {});

    }
};