import mongoose, { Schema, model, models, Document } from "mongoose";
import { NProduct } from "./Product"; // import your product interface

// Single item inside an order
export interface IOrderItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
  price: number; // snapshot of price at purchase
  subtotal: number;
}

// Full order
export interface IOrder extends Document {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId; // buyer
  items: IOrderItem[];
  totalAmount: number;
  status: "pending" | "paid" | "shipped" | "completed" | "cancelled";
  shippingAddress?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  payment?: {
    method?: string;
    transactionId?: string;
    status?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

// OrderItem schema
const OrderItemSchema = new Schema<IOrderItem>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  subtotal: { type: Number, required: true },
});

// Order schema
const OrderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [OrderItemSchema],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "completed", "cancelled"],
      default: "pending",
    },
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    payment: {
      method: String,
      transactionId: String,
      status: String,
    },
  },
  { timestamps: true }
);

//! calc-auto total amount -  it's work only on "save" 
// OrderSchema.pre("save", function (next) {
//   if (this.items && this.items.length > 0) {
//     this.totalAmount = this.items.reduce((sum, item) => sum + item.subtotal, 0);
//   }
//   next();
// });

const Order = models?.Order<IOrder> || model<IOrder>("Order", OrderSchema);

export default Order;
