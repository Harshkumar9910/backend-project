// cart.js
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Correct reference to 'User'
    products: [
        {
            product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, // Correct reference to 'Product'
            quantity: { type: Number, required: true,  },
            color: { type: String },
            size: { type: String }
        }
    ]
});

const Cart = mongoose.model("Cart", cartSchema); // Use 'Cart' instead of 'cart'
export default Cart;
