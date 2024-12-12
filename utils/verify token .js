import jwt from "jsonwebtoken";
import { secretKey } from "../constants/auth.js";

export const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; 
        
    if (!token) {
        return res.status(403).json({ message: "Token is required" });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
        
        req.user = decoded; 
        next();
});
};