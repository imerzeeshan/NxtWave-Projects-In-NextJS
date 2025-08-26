import mongoose, { Schema, model, models } from "mongoose";

type Image = {
  fileId: string;
  url: string;
  thumbnailUrl: string;
};

export interface NProduct {
  _id: mongoose.Types.ObjectId;
  title: string;
  brand: string;
  price: number;
  rating: string;
  category: string;
  style: string;
  description: string;
  totalReviews: number;
  availability: string;
  image: Image;
  createdAt?: Date;
  updatedAt?: Date;
}

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: String, required: true },
    category: { type: String, required: true },
    style: { type: String, required: true },
    description: { type: String, required: true },
    totalReviews: { type: Number, required: true },
    availability: { type: String, required: true },
    image: {
      fileId: String,
      url: String,
      thumbnailUrl: String,
    },
  },
  { timestamps: true }
);

const Product = models?.Product || model<NProduct>("Product", productSchema);

export default Product;
