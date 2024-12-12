import User from "../models/user.js";

export const createUser = async(req,res)=>{
    console.log('createUser controller starts')
    const {name,email,password,city,phone}=req.body;
    const user =new User ({name:name,email:email,password:password,phone:phone,city:city});
    try{
        const saveduser =await user.save();
        res.status(201).json({success:true,saveduser})
    } catch(error){
        console.log(error)
        res.status(400).json({messge:error.message})
    }
}


export const updateUser = async(req,res)=>{
    console.log(`updateUser controller starts :`);
    try{
       let userId = req.userId;
       let {name,email,address,phone,city,age} = req.body;
       let result = req.body;
       console.log(userId)
       console.log(result)

       let isUserEXists = await User.findById(userId).lean()
       console.log(isUserEXists)

       if(!isUserEXists){
        return res.status(404).json({message:'user does not exist',code:'NOT_FOUND:404'})
       }

       let updateDetails = await User.findByIdAndUpdate(userId,result,{new:true});

       return res.status(200).json({message:'details updated successfully ',data:updateDetails})

    }
    catch(error){
        console.log(`Exception occured at updateUser controller ${JSON.stringify(error)}`)
        return res.status(500).json({message:error.message})
    }
}
