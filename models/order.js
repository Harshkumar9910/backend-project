import mongoose, { SchemaTypes } from "mongoose";

const orderSchema = new mongoose.Schema({
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
      quantity: { type: Number, required: true },
      color:{type:String,required: true},
      size:{type:String,required: true},
      title: { type: String, required: true },
      price: { type: Number, required: false },
    },
  ],
  subtotal: { type: Number, required: false },
  discount: { type: Number },
  deliveryFee: { type: Number, required: true },
  total: { type: Number, required: false },
  userId:{type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  placedAt: { type: Date, default: Date.now },
  status: { type: String, default: "Arriving" } 

});
 const Order = mongoose.model("order", orderSchema);

export default Order