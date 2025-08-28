import mongoose, { Schema, models, model } from "mongoose";

export interface NCart {
  _id: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  productCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const userCartSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    productCount: { type: Number, required: true, default: 1 },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

// Optional: prevent same product multiple times for same user
userCartSchema.index({ userId: 1, product: 1 }, { unique: true });

const Cart = models?.Cart || model<NCart>("Cart", userCartSchema);

export default Cart;
