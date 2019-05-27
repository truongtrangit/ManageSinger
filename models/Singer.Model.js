import mongoose from "mongoose";
import ConnectDB from "../utils/ConnectDB";

// const mongoose = require("mongoose");
// const ConnectDB = require("../utils/ConnectDB");

ConnectDB();

// Tạo Schema: Mô tả cấu trúc lớp đối tượng
const singerSchema = new mongoose.Schema({
    name: { type: String, trim: true, required: true },
    image: { type: String, trim: true, required: true }
})

// Tạo lớp đối tượng
const Singer = mongoose.model('Singer', singerSchema);

// console.log(Singer);

export { Singer };

