// pages/api/create-order-cod.js
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { items, userId, address, totalAmount } = req.body;
    if (!items || !address) return res.status(400).json({ success: false, message: "Missing payload" });

    // TODO: validate user, authenticate using session/jwt

    // TODO: Persist order to DB with status "pending" and paymentMethod "cod"
    // Example placeholder:
    // const order = await Order.create({ userId, items, address, totalAmount, paymentMethod: "cod", status: "pending" });

    console.log("COD order created (placeholder):", { userId, totalAmount, address, items });
    return res.status(200).json({ success: true, orderId: `cod_${Date.now()}` });
  } catch (err) {
    console.error("create-order-cod error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
}
