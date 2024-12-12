
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number },
    city: { type: String,default:'' },
    age:{type:Number},
    alternatePhone:{type:String},
    gender:{type:String},
    address:{type:String,default:''},
});

const User = mongoose.model("User", userSchema); // Use 'User' instead of 'user'
export default User;
