import mongoose from "mongoose";
import MONGO_URL from "../config/Database";

// const mongoose = require("mongoose");
// const MONGO_URL = "mongodb://localhost/ManageSinger"

export default async () => {
    await mongoose.connect(MONGO_URL,  { useNewUrlParser: true}, (err) => {
        if(err) return console.log(err);
        console.log("Connected Database");
    })
}

//TEST
// let ConnectDB = async () => {
//     await mongoose.connect(MONGO_URL, (err) => {
//         if (err) return console.log(err);
//         console.log("Connected Database");
//     })
// }

// export default ConnectDB;
// module.exports = ConnectDB;
