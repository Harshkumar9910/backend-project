import { Router } from "express";
import { getnewarrivalsdetails } from "../controllers/Newarrivals.js";
const router =Router();
router.post("/getnewarrivals",getnewarrivalsdetails)





export default router;