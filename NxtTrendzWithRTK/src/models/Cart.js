import mongoose, { Schema, models, model } from "mongoose";

const userCartSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    productCount: { type: Number, required: true, default: 1 },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

// Optional: prevent same product multiple times for same user
userCartSchema.index({ userId: 1, product: 1, sellerId: 1 }, { unique: true });

const Cart = models?.Cart || model("Cart", userCartSchema);

export default Cart;
