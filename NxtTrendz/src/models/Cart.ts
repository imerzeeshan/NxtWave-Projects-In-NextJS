import mongoose, { Schema, models, model } from "mongoose";

export interface NCart {
  _id: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  productCount: number;
  title: string;
  brand: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userCartSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    productCount: { type: Number, required: true, default: 1 },
    title: { type: String, required: true },
    brand: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

// Optional: prevent same product multiple times for same user
userCartSchema.index({ userId: 1, productId: 1 }, { unique: true });

const Cart = models?.Cart || model<NCart>("Cart", userCartSchema);

export default Cart;
