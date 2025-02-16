import mongoose, { Connection } from "mongoose";

type ConnectionObject = {
    isConnected?:number
}

const connection : ConnectionObject = {}
export default async function dbconnect() : Promise<void>{
    if(connection.isConnected){
        console.log("Already Connected");
        return ;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI as string);
        connection.isConnected = db.connections[0].readyState;
        console.log("database connected successfully")
    } catch (error) {
        console.log("Database connection failed");
        process.exit(1);
    }
}