import sequelize from "../db/db.js";
import { DataTypes } from "sequelize";

export const Record = sequelize.define(
    "Record",
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

Record.associate = (models) => {
    Record.belongsTo(models.User, {
        foreignKey: "userID",
        as: "user",
    });
    Record.belongsToMany(models.Book, {
        through: "RecordBooks",
        foreignKey: "recordID",
        as: "books",
    });
};
