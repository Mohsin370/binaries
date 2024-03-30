'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Permissions', [{
            permission_name: 'CREATE_ROLE',
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            permission_name: 'VIEW_PRODUCT',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            permission_name: 'UPDATE_PRODUCT',
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
        }, {
            permission_name: 'VIEW_ORDER',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            permission_name: 'CREATE_ORDER',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            permission_name: 'UPDATE_ORDER',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            permission_name: 'DELETE_ORDER',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            permission_name: 'VIEW_INVOICE',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            permission_name: 'CREATE_INVOICE',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            permission_name: 'UPDATE_INVOICE',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            permission_name: 'DELETE_INVOICE',
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Permissions', null, {});

    }
};