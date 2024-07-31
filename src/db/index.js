import mongoose from "mongoose";
import {DB_NAME} from "../constant.js"



/*const connectDB= async()=>{
  try {
    const connectionInstance=await mongoose.connect('${process.env.MONGODB_URI}/${DB_NAME}')
      console.log('\n MongoDB Connected !! DB HOST:${connectionInstance.connection.host}')
  } catch (error) {
    console.log("MONGODB CONNECTION ERROR", error);
    process.exit(1)
    
  }
}
export default connectDB;
const mongoose = require('mongoose');
require('dotenv').config();*/

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
