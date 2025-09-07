import mongoose, { Schema, model, models } from "mongoose";


const categorySchema = new Schema(
  {
    categoryName: { type: String, require: true },
  },
  { timestamps: true }
);

const Category =
  models?.Category || model("Category", categorySchema);
export default Category;
