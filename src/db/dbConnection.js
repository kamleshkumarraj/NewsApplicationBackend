import mongoose from 'mongoose';

export const dbConnection = async () => {

        const connect = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Database connected successfully on port : ${connect.connection.port} and host : ${connect.connection.host} and databasename is ${connect.connection.name}`)
    
}