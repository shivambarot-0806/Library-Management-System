import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/db.js";

const PORT = process.env.PORT || 3000
dotenv.config({
    path: "./.env"
})

connectDB()
.then( () => {
    
    app.listen(PORT, () => {
        console.log(` Server is running on port: ${PORT}`)
    });
    app.on("error", (error) => {
        console.log("error: ",error)
        throw error
    });

}
)
.catch( () => {
    console.log("Database connection failed  !!!!!!!...........")
}
)

