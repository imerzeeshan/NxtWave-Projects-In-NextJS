import mongoose, { Schema, model, models } from "mongoose";

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
    seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
    image: {
      fileId: String,
      url: String,
      thumbnailUrl: String,
    },
  },
  { timestamps: true }
);

const Product = models?.Product || model("Product", productSchema);

export default Product;
