const mongoose = require("mongoose");

const connectToDB = async ()=>{
    try{
    const connection = await mongoose.connect("mongodb://localhost/Inotebooktest");
    console.log("connection successfull!!");
    }
    catch(e){
        console.log("connection refused");
    }
}


module.exports = connectToDB;
