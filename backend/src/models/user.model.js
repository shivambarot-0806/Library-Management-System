import sequelize from "../db/db.js";
import { DataTypes, UniqueConstraintError, UUIDV4 } from "sequelize";

export const User = sequelize.define("User", {
    id: {
        type: UUIDV4,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    }
})