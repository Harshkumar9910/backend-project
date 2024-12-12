import jwt from "jsonwebtoken";
import { secretKey } from "../constant/auth.js"; 

export const createToken = (userId) => {
    const token = jwt.sign({ userId }, secretKey, { expiresIn: "70d" });
    console.log("Generated Token:", token);
    return token;
};