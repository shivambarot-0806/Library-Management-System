import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: "postgres"
});

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("Connection successfully established..................");
    } catch (error) {
        console.error("Error: Unable to connect Database !!!!!!!!!!!!!!!!!", error);
    }
}


export default {connectDB, sequelize};