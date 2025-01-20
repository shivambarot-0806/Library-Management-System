import dotenv from "dotenv";
dotenv.config({
    path: "./.env",
});

import app from "./app.js";
import {connectDB} from "./db/db.js";

const PORT = process.env.PORT || 3000;
console.log("Sequelize Config:", {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(` Server is running on port: ${PORT}`);
        });
        app.on("error", (error) => {
            console.log("error: ", error);
            throw error;
        });
    })
    .catch(() => {
        console.log("Database connection failed  !!!!!!!...........");
        process.exit(1);
    });
