import sequelize from "./db/db.js"; // Your Sequelize instance
import { User } from "./models/user.model.js";
import { Book } from "./models/book.model.js";
import { Record } from "./models/records.model.js";

// Sync models
(async () => {
    try {
        await sequelize.sync({ alter: true }); // Updates schema based on models
        console.log("Database synced successfully.");
    } catch (error) {
        console.error("Error syncing database:", error);
    }
})();
