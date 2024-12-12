// import { Router } from "express"; 
// import { products } from "../data.js"; 

// const router = Router();

// router.get("/getproduct", (req, res) => {
//     let result;
//     const category = req.body.category;
//     if (category) {
//         result = products.filter((products) => products.tag === category)
//     } else {
//         result = products
//     } 
//     res.status(200).json({ data: result })
// })
// router.get("/productdetails", (req, res) => {
//     const productId = req.body.Id;
//     if (!productId) {
//         res.status(400).send({ message: "productid is required" });
//     } else {
//         res.status(200).send({ data: { id: "2", prize: "400" } });
//     }
// })
// export default router;

import { Router } from "express";
import { createProduct, getAllProducts, getproductdetails, getSingleProduct } from "../controllers/Product.js";


const router = Router();


router.get("/getproductdetails",getproductdetails)
router.post('/createproduct',createProduct)
router.get("/getAll",getAllProducts)
router.get("/getSingleProduct",getSingleProduct)


export default router

