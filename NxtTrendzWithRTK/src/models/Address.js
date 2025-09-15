import { Schema, models, model } from "mongoose";

const addressSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    pincode: { type: String, required: true },
    houseDetails: { type: String, required: true },
    areaDetails: { type: String, required: true },
    landmark: String,
    city: { type: String, required: true },
    state: { type: String, required: true },
    addressType: {
      type: String,
      enum: ["Home", "Work", "Other"],
      default: "Home",
    },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Address = models?.Address || model("Address", addressSchema);
export default Address;
