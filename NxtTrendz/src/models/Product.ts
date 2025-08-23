import mongoose, { Schema, model, models } from "mongoose";

export interface NProduct {
  _id: mongoose.Types.ObjectId;
  title: string;
  brand: string;
  price: number;
  image_url: string;
  rating: string;
  categoryId: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    rating: { type: String, required: true },
    categoryType: { type: String, required: true },
  },
  { timestamps: true }
);

const Product = models?.Product || model<NProduct>("Product", productSchema);

export default Product;
