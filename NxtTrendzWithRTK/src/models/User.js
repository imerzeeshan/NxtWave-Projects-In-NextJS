import bcrypt from "bcryptjs";
import { model, models, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number },
    bio: { type: String },
    role: {
      type: String,
      enum: ["user", "seller", "admin", "requested"], // ✅ only allow these values
      default: "user", // ✅ default is normal user
    },
    image: {
      url: { type: String },
      thumbnailUrl: { type: String },
      fileId: { type: String },
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = models?.User || model("User", userSchema);

export default User;
