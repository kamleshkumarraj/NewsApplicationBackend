import dotenv from 'dotenv'
dotenv.config({
    path : 'src/.env'
});
import { app } from "./app.js";
import { dbConnection } from "./db/dbConnection.js";
import cloudinary from "cloudinary"

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

//getting port from environment variable or default to 3000
const PORT = process.env.PORT || 3000;

//default route for getting response.
app.get('/', (req, res) => {
    res.status(200).json({
        success : true,
        message : "Everything is ok."
    })
})

//code for listen on server on port if database is successfully connected.
dbConnection()
.then(() => {
    app.listen(PORT , () => {
        console.log(`App is listening on port ${PORT}`);
    })
})
.catch((err) => {
    console.log("Server can't be statred because database connection failed due to this error !" , err)
})
