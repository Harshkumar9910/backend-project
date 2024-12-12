import Order from "../models/order.js";
import Cart from "../models/cart.js";
import product from "../models/ProductsModels.js"
import mongoose from "mongoose";

const { ObjectId } = mongoose.Types

export const createOrder = async (req, res) => {
    console.log('createOrder started');
    const { body } = req;
    const userId = req.userId;

    try {
        if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
            return res.status(400).json({ message: "Order must contain at least one item." });
        }

        console.log("Order items:", body.items);


        const items = body.items.map((product) => { return { ...product, productId: new ObjectId(product.product_id) } })

        const newOrder = await Order.create({
            items: items,
            subtotal: body.subtotal,
            discount: body.discount,
            deliveryFee: body.deliveryFee,
            total: body.total,
            userId,
            placedAt: Date.now()
        });

        res.status(201).json(newOrder);

        await Cart.deleteMany({ userId });
    } catch (error) {
        console.error('Error:', error);
        res.status(400).json({ message: "Could not place order, try again later." });
    }
};





export const fetchOrder = async (req, res) => {
    const userId = req.userId;

    try {
        const orders = await Order.find({ userId }).lean();

        if (!orders.length) {
            return res.status(404).json({ message: "No orders found for this user." });
        }

        const ordersWithProductDetails = await Promise.all(
            orders.map(async (order) => {
                const itemsWithDetails = await Promise.all(
                    order.items.map(async (item) => {
                        const productDetails = await product.findById(item.productId).lean();                                                          
                        return { ...item, productDetails };
                    })
                );
                return { ...order, items: itemsWithDetails };
            })
        );

        res.status(200).json(ordersWithProductDetails);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Failed to fetch orders. Please try again later." });
    }
};

export const cancelOrder = async (req, res) => {
    const userId = req.userId;
    const { orderId } = req.query;

    try {
        console.log('cancelOrder controller starts ')
        const order = await Order.findOne({ _id: orderId, userId });

        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }
        console.log(order)

        order.status = "canceled";
        await order.save();

        res.status(200).json({ message: "Order has been canceled successfully.", order });
    } catch (error) {
        console.error("Error canceling order:", error);
        res.status(500).json({ message: "Failed to cancel the order. Please try again later."});
}
};