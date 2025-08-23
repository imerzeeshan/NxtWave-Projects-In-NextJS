import mongoose, { Schema, model, models } from "mongoose";

export interface NCategory {
  _id: mongoose.Types.ObjectId;
  categoryName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const categorySchema = new Schema(
  {
    categoryName: { type: String, require: true },
  },
  { timestamps: true }
);

const Category =
  models?.Category || model<NCategory>("Category", categorySchema);
export default Category;
