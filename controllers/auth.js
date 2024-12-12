


import User from"../models/user.js"
import { createToken } from "../utils/createToken.js";

export const login = async(req,res)=>{

    const {email,password}=req.body;

    const userExists = await User.exists({email:email, password:password});
  
    if(userExists){

        const jwt = createToken(userExists._id)
        res.status(200).json({message:"success",success:true,token:jwt});
    return;
    }
    res.status(200).json({message:"User Id or Password is Incorrect!"})
}

