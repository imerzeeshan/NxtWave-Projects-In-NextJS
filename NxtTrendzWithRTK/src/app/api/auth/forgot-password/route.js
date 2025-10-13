import User from "@/models/User";
import PasswordResetToken from "@/models/PasswordResetToken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { connectToDatabase } from "@/lib/db";

export async function POST(req) {
  await connectToDatabase();
  const { email } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return new Response(
      JSON.stringify({ success: false, message: "User not found" }),
      { status: 404 }
    );
  }

  // generate token
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 15); // 15 min

  // save token
  await PasswordResetToken.deleteMany({ userId: user._id });
  await PasswordResetToken.create({ userId: user._id, token, expiresAt });

  const resetLink = `${process.env.APP_URL}/reset-password?token=${token}`;

  // send email
  const transporter = nodemailer.createTransport({
    host: process.env.BREVO_SMTP_HOST,
    port: process.env.BREVO_SMTP_PORT,
    auth: {
      user: process.env.BREVO_USER,
      pass: process.env.BREVO_PASS,
    },
  });

  await transporter.sendMail({
    from: `"My App" <${process.env.BREVO_USER}>`,
    to: user.email,
    subject: "Password Reset Request",
    html: `<p>Hello ${user.name},</p>
           <p>You requested to reset your password.</p>
           <p><a href="${resetLink}">Click here to reset password</a></p>
           <p>This link will expire in 15 minutes.</p>`,
  });

  return new Response(
    JSON.stringify({ success: true, message: "Reset email sent" }),
    { status: 200 }
  );
}
