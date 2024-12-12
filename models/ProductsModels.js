// import mongoose from 'mongoose'

// const productSchema = new mongoose.Schema({
    
    
   
//     image:{
//         type:String,required:true
//     },
//     title:{
//         type:String,required:true
//     },
//     rating:{
//         type:String,required:true

//       }, price:{
//         type:String,required:true
       
//       }
//       ,tag:{
//         type:String,required:true
//       },
//       mainheading:{
//         type:String,required:true
//     },image1:{
//         type:String,required:true
//     },image2:{
//         type:String,required:true
//     },image3:{
//         type:String,required:true
//     },image4:{
//         type:String,required:true
//     },image5:{
//         type:String,required:true
//     },heading1:{
//         type:String,required:true
//     },price1:{
//         type:String,required:true
//     },price2:{
//         type:String,required:true
//     },para1:{
//         type:String,required:true
//     },heading2:{
//         type:String,required:true
//     },image6:{
//         type:String,required:true
//     },button1:{
//         type:String,required:true
//     },button2:{
//         type:String,required:true
//     },button3:{
//         type:String,required:true
//     },button4:{
//         type:String,required:true
//     },button5:{
//         type:String,required:true
//     },para2:{
//         type:String,required:true
//     },para3:{
//         type:String,required:true
//     },para4:{
//         type:String,required:true
//     },para5:{
//         type:String,required:true
//     },para6:{
//         type:String,required:true
//     },para7:{
//         type:String,required:true
//     },para8:{
//         type:String,required:true
//     },para9:{
//         type:String,required:true
//     },para10:{
//         type:String,required:true
//     },heading3:{
//         type:String,required:true
    
//     }
    
        
      
// })

// export const productsModel = mongoose.model('product',productSchema);


// export default productsModel;
// Import the mongoose library
import mongoose from 'mongoose';

// Define the product schema
const productSchema = new mongoose.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    rating: { type: String, required: true },
    price: { type: String, required: true },
    tag: { type: String, required: true },
    mainheading: { type: String, required: true },
    image1: { type: String, required: true },
    image2: { type: String, required: true },
    image3: { type: String, required: true },
    image4: { type: String, required: true },
    image5: { type: String, required: true },
    heading1: { type: String, required: true },
    price1: { type: String, required: true },
    price2: { type: String, required: true },
    para1: { type: String, required: true },
    heading2: { type: String, required: true },
    image6: { type: String, required: true },
    button1: { type: String, required: true },
    button2: { type: String, required: true },
    button3: { type: String, required: true },
    button4: { type: String, required: true },
    button5: { type: String, required: true },
    para2: { type: String, required: true },
    para3: { type: String, required: true },
    para4: { type: String, required: true },
    para5: { type: String, required: true },
    para6: { type: String, required: true },
    para7: { type: String, required: true },
    para8: { type: String, required: true },
    para9: { type: String, required: true },
    para10: { type: String, required: true },
    heading3: { type: String, required: true }
});

const productsModel = mongoose.model('Product', productSchema); 

export default productsModel;
