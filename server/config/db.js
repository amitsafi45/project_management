import 'dotenv/config'
import mongoose from "mongoose";

export const AppDataSource=async()=>{
    const conn=await mongoose.connect(process.env.MONOGO_DB_URL)
    console.log(`MongoDB connected:${conn.connection.host}`);
}