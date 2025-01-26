const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const databaseConnection = async()=>{

    try{
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("db connected")
    }catch(err){
        console.log(`Error in connecting DB. Error: ${err}`)
    }

}

module.exports = databaseConnection