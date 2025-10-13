import User from "@/models/User";
import PasswordResetToken from "@/models/PasswordResetToken";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/db";

export async function POST(req) {
  await connectToDatabase();
  const { token, newPassword } = await req.json();

  const resetRecord = await PasswordResetToken.findOne({ token });
  if (!resetRecord || resetRecord.expiresAt < Date.now()) {
    return new Response(
      JSON.stringify({ success: false, message: "Invalid or expired token" }),
      { status: 400 }
    );
  }

  const user = await User.findById(resetRecord.userId);
  if (!user) {
    return new Response(
      JSON.stringify({ success: false, message: "User not found" }),
      { status: 404 }
    );
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  await PasswordResetToken.deleteMany({ userId: user._id });

  return new Response(
    JSON.stringify({ success: true, message: "Password reset successful" }),
    { status: 200 }
  );
}
