import { Router } from "express";
import { createOrder, fetchOrder, cancelOrder } from "../controllers/order.js"
import { verifyToken } from "../middleware/authToken.js";

const router = Router();

router.post("/createOrder", verifyToken, createOrder);
router.get("/fetchOrder", verifyToken, fetchOrder)
router.patch("/cancelOrder", verifyToken, cancelOrder);

export default router;