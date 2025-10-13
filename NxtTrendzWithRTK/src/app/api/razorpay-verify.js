// pages/api/razorpay-verify.js
import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, cartItems, address, userId } = req.body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (expectedSign === razorpay_signature) {
      // Payment verified successfully.
      // TODO: Create order in your DB here (mark as paid). Example placeholder:
      // await OrderModel.create({ userId, items: cartItems, address, payment: { id: razorpay_payment_id, orderId: razorpay_order_id }, status: "paid" });

      console.log("Payment verified. Save order to DB:", { razorpay_order_id, razorpay_payment_id, userId });
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (err) {
    console.error("verify error", err);
    res.status(500).json({ success: false, message: err.message });
  }
}
