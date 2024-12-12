import { Router } from "express";
import { createUser, updateUser } from "../controllers/user.js";
import { verifyToken } from "../middleware/authToken.js";

const router = Router();


router.post("/create",createUser)
router.put('/update',verifyToken,updateUser)



export default router