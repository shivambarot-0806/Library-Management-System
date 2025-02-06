import sequelize from "./db.js";
import { User } from "../models/user.model.js";
import { Book } from "../models/book.model.js";
import { Record } from "../models/records.model.js";

async function syncDB() {
    try {
        await sequelize.sync({alter: true});
        console.log("Database synced successfully...");
    } catch (error) {
        console.log("Unable to sync Database!!!! ");
    }
}

export default syncDB;