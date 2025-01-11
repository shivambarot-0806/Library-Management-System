import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

export const Book = sequelize.define(
    "Book",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        coverPage: {
            type: DataTypes.STRING, // cloudinary url for image
            allowNull: true,
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isbn: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isNumeric: true,
                len: [10, 13],
            },
        },
        edition: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        publicationHouse: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        publicationYear: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        totalCopies: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        availableCopies: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: true,
    }
);

Book.associate = (models) => {
    Book.belongsToMany(models.Record, {
        through: "recordBooks",
        foreignKey: "bookID",
        as: "records",
    });
};
