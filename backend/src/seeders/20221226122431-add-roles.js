'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Roles', [{
            role_name: 'admin',
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            role_name: 'customer',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            role_name: 'sub_customer',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            role_name: 'supplier',
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Roles', null, {});
    }
};