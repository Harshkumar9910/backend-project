
import Cart from "../models/cart.js";


// export const addToCart = async (req, res) => {
//   try {
//     const { product_id, color, size, quantity } = req.body;
//     const user_id = req.userId;

//     if (!product_id || !color || !size || !quantity) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     let cart = await Cart.findOne({ user_id });

//     // Check if the product is already in the cart
//     if (cart) {
//       const existingProduct = cart.products.find(
//         (product) => product.product_id.toString() === product_id.toString()
//       );
//       if (existingProduct) {
//         // Product already exists, so update its quantity
//         existingProduct.quantity += quantity;
//       } else {
//         // If the product is not in the cart, add it
//         cart.products.push({ product_id, color, size, quantity });
//       }
//       await cart.save();
//       return res.status(200).json({ message: "Cart updated", cart });
//     } else {
//       // If the cart doesn't exist, create a new cart
//       const newCart = new Cart({
//         user_id,
//         products: [{ product_id, color, size, quantity }],
//       });
//       await newCart.save();
//       return res.status(201).json({ message: "Item added to cart", cart: newCart });
//     }
//   } catch (error) {
//     console.error("Error in addToCart:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };



export const addToCart = async (req, res) => {
  try {
    const { product_id, color, size, quantity } = req.body;
    const user_id = req.userId;

    if (!product_id || !color || !size || !quantity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let cart = await Cart.findOne({ user_id });

    // Check if the cart exists
    if (cart) {
      // Check if the product with specific size and color already exists
      const existingProduct = cart.products.find(
        (product) =>
          product.product_id.toString() === product_id.toString() &&
          product.color === color &&
          product.size === size
      );

      if (existingProduct) {
        // If the product exists, update its quantity
        existingProduct.quantity += quantity;
      } else {
        // If the product with the given size and color doesn't exist, add it
        cart.products.push({ product_id, color, size, quantity });
      }

      await cart.save();
      return res.status(200).json({ message: "Cart updated", cart });
    } else {
      // If the cart doesn't exist, create a new cart
      const newCart = new Cart({
        user_id,
        products: [{ product_id, color, size, quantity }],
      });
      await newCart.save();
      return res.status(201).json({ message: "Item added to cart", cart: newCart });
    }
  } catch (error) {
    console.error("Error in addToCart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};





export const getCart = async (req, res) => {
  try {
    console.log('getCart controller starts');
    
    const userId = req.userId; 
    console.log("UserId from request:", userId);

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

 
    const cart = await Cart.findOne({ user_id: userId }).populate('products.product_id');
    console.log("Cart Data:", cart);

    if (!cart || !cart.products || cart.products.length === 0) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    // Send populated cart data with products
    return res.status(200).json(cart); 
  } catch (error) {
    console.error("Exception occurred while fetching cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};




export const updateCartItem = async (req, res) => {
  try {
    console.log('updateCartItem controller starts ')
    const { cartItemId, quantity } = req.body;
   
    const userId = req.userId;
   

   
    if (!cartItemId || quantity === undefined) {
      return res.status(400).json({ message: "cartItemId and quantity are required" });
    }

 
    const quantityNumber = parseInt(quantity, 10);

 
    if (isNaN(quantityNumber) || quantityNumber <= 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }


    const cart = await Cart.findOne({ user_id: userId });
    console.log(cart)

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

   
    const item = cart.products.find(product => product.product_id.toString() === cartItemId);
   
    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

 
    item.quantity = quantityNumber;
    await cart.save();


    return res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    console.error("Error updating cart item:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



export const deleteCartItem = async (req, res) => {
  try {
    console.log('deleteCartItem started : ')
    const { cartItemId } = req.body;
    const userId = req.userId;
    console.log(userId)

    if (!cartItemId) {
      return res.status(400).json({ message: "cartItemId is required" });
    }

    const cart = await Cart.findOne({ user_id: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    
    const updatedCart = await Cart.findOneAndUpdate(
      { user_id: userId },
      { $pull: { products: { _id: cartItemId } } },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart item not found" });
    }


    return res.status(200).json({ message: "Item removed from cart", updatedCart });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



export const increaseQuantity = async (req, res) => {
  try {
    const { cartItemId } = req.body;
    const userId = req.userId;
    console.log(userId)

    if (!cartItemId) {
      return res.status(400).json({ message: "cartItemId is required" });
    }

    const cart = await Cart.findOne({ user_id: userId }).populate('products.product_id');

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    
   
    const item = await Cart.find({'products.product_id':cartItemId}).populate().lean();


    

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (item.quantity <= 1) {
      return res.status(400).json({ message: "Quantity cannot go below 1" });
    }

    const updatedCart = await Cart.findOneAndUpdate({user_id:userId,'products.product_id':cartItemId},{$inc:{'products.$.quantity':1}})

    item.quantity -= 1;
    await cart.save();

    return res.status(200).json({ message: "Quantity decreased", cart:updatedCart });
  } catch (error) {
    console.error("Error decreasing quantity:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const decreaseQuantity = async (req, res) => {
  try {
    const { cartItemId } = req.body;
    const userId = req.userId;

    if (!cartItemId) {
      return res.status(400).json({ message: "cartItemId is required" });
    }

    const cart = await Cart.findOne({ user_id: userId }).populate('products.product_id'); // Ensure product_id is populated

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = await Cart.find({'products.product_id':cartItemId}).populate().lean();

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (item.quantity <= 1) {
      return res.status(400).json({ message: "Quantity cannot go below 1" });
    }

    const updatedCart = await Cart.findOneAndUpdate({user_id:userId,'products.product_id':cartItemId},{$inc:{'products.$.quantity':-1}})

    item.quantity -= 1;
    await cart.save();

    return res.status(200).json({ message: "Quantity decreased", cart:updatedCart });
  } catch (error) {
    console.error("Error decreasing quantity:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
