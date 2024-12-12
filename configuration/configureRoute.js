import productRoute from "../routes/products.js"
import cartRoute from "../routes/cart.js"
import addToCart from "../routes/cart.js"
import newarrivalRoute from "../routes/newarrivals.js"
import userRoute from "../routes/user.js";
import authRoute from "../routes/auth.js";
import  Order  from "../routes/order.js";
import  me  from "../routes/Profile.js";

export const configureRoute= (app)=>{
   
    app.use("/products", productRoute);
    app.use ("/cart", cartRoute);
    app.use ("/addToCart", addToCart);

    app.use("/newarrivals",newarrivalRoute)
    app.use("/user",userRoute)
    app.use("/auth",authRoute)
    app.use("/Order",Order)
    app.use("/Profile",me)

}  