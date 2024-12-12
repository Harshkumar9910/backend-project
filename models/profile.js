import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true  },
  email: { type: String, required: true, unique: true },
  gender:{type:String},
  password: { type: String, required: true },
  phone: { type: String },
  alternatePhone:{type:String},
  address: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const User1 = mongoose.model("User1",userSchema);
export default User1;