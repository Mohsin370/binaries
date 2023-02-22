'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Permissions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            permission_name: {
                type: Sequelize.STRING,
                unique: true,
            },
            // role_id: {
            //     type: Sequelize.INTEGER,
            //     references: {
            //         model: 'Roles',
            //         key: 'id',
            //         type: 'Foreign Key'
            //     }
            // },
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
        await queryInterface.dropTable('Permissions');
    }
};