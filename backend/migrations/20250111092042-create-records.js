"use strict";

/** @typedef {import('sequelize-cli').Migration} */

export const up = async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
        "Records",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            userID: {
                type: DataTypes.UUID,
                references: {
                    model: "Users",
                    key: "id",
                },
            },
            bookID: {
                type: DataTypes.UUID,
                references: {
                    model: "Books",
                    key: "id",
                },
            },
            borrowDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            returnDate: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            status: {
                type: DataTypes.ENUM("active", "completed"),
                defaultValue: "active",
            },
        },
        {
            timestamps: true,
        }
    );
};

export const down = async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Records");
};
