import { Router } from "express";
import { addToCart, getCart, updateCartItem, deleteCartItem, increaseQuantity, decreaseQuantity } from "../controllers/cart.js";
import { verifyToken } from "../middleware/authToken.js";




const router = Router();

router.post("/addToCart", verifyToken, addToCart)
router.get("/getCart", verifyToken, getCart)
router.patch("/updateCartItem", verifyToken, updateCartItem)
router.delete("/deleteCartItem", verifyToken, deleteCartItem)
router.post("/increaseQuantity", verifyToken, increaseQuantity)
router.post("/decreaseQuantity", verifyToken, decreaseQuantity)






export default router;