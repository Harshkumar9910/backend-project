import  productsModel  from "../models/ProductsModels.js";

export const getproductdetails= (req, res) => {
    console.log('getProduct started :')
    const productId = req.query.id;
    let result;

    if(productId){
        console.log("Received Product ID:", productId);
        result = data.filter((product) => product.id == productId);
    }else{
        result = data4;
        
    }
    if (result.length === 0) {
        return res.status(404).send({ message: "No products found for the given id" });
    }

    return res.status(200).send({ data:result});
};


export const createProduct =async(req,res)=>{
    console.log('createProduct controller starts')
    const result = req.body;

    console.log(req.body)

    
    

    try{

        let saveDetails = await productsModel.create(result);
        return res.status(200).json(saveDetails);
    }
    catch(err){
        console.log('EXception occured at createProduct',
            err)

            return res.status(500).json({message:'Internal server error'})

    }
}


export const getAllProducts = async (req,res)=>{

    try{
        let {tag } = req.query;
        let products = await productsModel.find({tag:tag})

        return res.status(200).json(products)
    }
    catch(error){
        console.log('EXception occured at getAllProduct',
            err)

            return res.status(500).json({message:'Internal server error'})
}
}

export const getSingleProduct = async (req, res) => {
    let { id } = req.query;    
    try {
      let productdetails = await productsModel.findById(id).lean();
  
      res.status(200).json(productdetails);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
}
};