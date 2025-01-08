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


// ;( async () => {
//     try {
//         await sequelize.authenticate();
//         console.log("Connection successfully established..................");

//         app.on("error", (error) => {
//             console.log("ERRORR !!!!", error);
//             throw error;
//         })

//         app.listen(process.env.PORT ,() => {
//             console.log(`App is listening on port ${process.env.PORT}`);
//         })
//     } catch (error) {
//         console.error("Error: Unable to connect Database !!!!!!!!!!!!!!!!!", error);
//     }
// })()

