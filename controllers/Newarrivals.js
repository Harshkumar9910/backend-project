// import { data } from "../data.js";

export const getnewarrivalsdetails=(req,res)=>{
    let result
    const category=req.body.category;
    if(category){
        result=data.filter((products)=>products.tag===category)
    }else{
        result=data
    }
    res.status(200).json({data:result})
} 
