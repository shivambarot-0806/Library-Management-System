import dotenv from "dotenv";
dotenv.config({
    path: "./.env",
});

import app from "./app.js";
import {connectDB} from "./db/db.js";
import syncDB from "./db/sync.js";

const PORT = process.env.PORT || 3000;


connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(` Server is running on port: ${PORT}`);
        });
        syncDB();
        app.on("error", (error) => {
            console.log("error: ", error);
            throw error;
        });
    })
    .catch(() => {
        console.log("Database connection failed  !!!!!!!...........");
        process.exit(1);
    });
