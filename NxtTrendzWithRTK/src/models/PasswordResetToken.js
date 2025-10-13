import { Schema, model, models } from "mongoose";

const resetTokenSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

const PasswordResetToken =
  models.PasswordResetToken || model("PasswordResetToken", resetTokenSchema);

export default PasswordResetToken;
