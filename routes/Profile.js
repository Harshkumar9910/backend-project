// import express from "express"
// import getUserDetails from "../controller/profile.js"
// import { updateprofile } from "../controller/profile.js";
// import { verifyToken } from "../middleware/authenticationtoken.js";

import express from "express"
import getUserDetails from "../controllers/Profile.js";
import { verifyToken } from "../middleware/authToken.js";
import { updateprofile } from "../controllers/Profile.js";

const router = express.Router();

router.get('/me', verifyToken, getUserDetails);
router.put('/updateprofile', verifyToken, updateprofile);


export default router;