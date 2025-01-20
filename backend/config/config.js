import dotenv from "dotenv";

dotenv.config({
    path: "./.env",
}); // Load environment variables from .env file

export default {
    development: {
        username: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD ,
        database: process.env.DB_NAME || "library_management_dev",
        host: process.env.DB_HOST || "127.0.0.1",
        dialect: "postgres", // Change to your preferred database dialect (e.g., 'mysql', 'sqlite')
        logging: console.log, // Log SQL queries for debugging
    },
    test: {
        username: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || null,
        database: process.env.DB_TEST_NAME || "library_management_test",
        host: process.env.DB_HOST || "127.0.0.1",
        dialect: "postgres",
        logging: false, // Disable logging for test environment
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_PROD_NAME,
        host: process.env.DB_HOST,
        dialect: "postgres",
        logging: false, // Disable logging in production
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false, // If using self-signed certificates
            },
        },
    },
};
