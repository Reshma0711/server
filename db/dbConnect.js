const mongoose = require('mongoose');
const dotenv=require("dotenv")
dotenv.config()



const mongouri=process.env.MONGO_URI
const dbConnect =async()=>{
    try{
           await mongoose.connect(mongouri)
           console.log("Database Connection Successful")
    }
    catch(err)
  {
      console.log("Error",err)
    }     
}



module.exports = dbConnect;
