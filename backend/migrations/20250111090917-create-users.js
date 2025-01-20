"use strict";

/**
 * @typedef {import('sequelize-cli').Migration} Migration
 */

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {typeof import('sequelize')} Sequelize
 */
export const up = async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
        "Users",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.ENUM("librarian", "student"),
                allowNull: false,
                defaultValue: "student",
            },
            refreshToken: {
                type: DataTypes.TEXT,
            },
        },
        {
            timestamps: true,
        }
    );
};

export const down = async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
};
