import { Sequelize } from "sequelize";


if (!process.env.DB_USER || !process.env.DB_PASSWORD) {
    throw new Error("Database environment variables are missing in .env file");
}

const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: "postgres"
});

export default sequelize;

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("Connection successfully established..................");
    } catch (error) {
        console.error("Error: Unable to connect Database !!!!!!!!!!!!!!!!!", error);
    }
}

export { connectDB };