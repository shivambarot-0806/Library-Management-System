import sequelize from "../db/db.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const User = sequelize.define(
    "User",
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

User.associate = (models) => {
    User.hasMany(models.Record, {
        foreignKey: "userID",
        as: "records",
    });
};

User.addHook("beforeSave", async (user) => {
    if (user.changed("password")) {
        user.password = await bcrypt.hash(user.password, 10);
    }
});

User.prototype.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

User.prototype.generateAccessToken = function () {
    console.log("Generating access token for user:", this.id);
    try {
        const token = jwt.sign(
            {
                id: this.id,
                email: this.email,
                name: this.name
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1d'
            }
        );
        console.log("Access token generated successfully");
        return token;
    } catch (error) {
        console.error("Error generating access token:", error);
        throw error;
    }
};

User.prototype.generateRefreshToken = function () {
    console.log("Generating refresh token for user:", this.id);
    try {
        const token = jwt.sign(
            {
                id: this.id
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '10d'
            }
        );
        console.log("Refresh token generated successfully");
        return token;
    } catch (error) {
        console.error("Error generating refresh token:", error);
        throw error;
    }
};
