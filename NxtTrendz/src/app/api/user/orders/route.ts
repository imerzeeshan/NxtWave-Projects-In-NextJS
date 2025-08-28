import { NextResponse } from "next/server";
import Product from "@/models/Product";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { CustomJwtPayload } from "../../seller/product/route";
import Cart from "@/models/Cart";
import { connectToDatabase } from "@/lib/db";

export async function POST(req: Request) {
  try {
    // const body = await req.json();

    const cookie = await cookies();
    const token = cookie.get("token")?.value;
    if (!token) return null;
    const decode = jwt.verify(
      token,
      process.env.JWT_TOKEN_SECRET!
    ) as CustomJwtPayload;

    // body should look like this:
    // {
    //   "user": "66d1b5e...",
    //   "items": [{ "product": "66d1a8c...", "quantity": 2 }],
    //   "shippingAddress": {...},
    //   "payment": { "method": "card" }
    // }

    await connectToDatabase();
    const cartItems = await Cart.find({ userId: decode.id })
      .populate("product")
      .populate("userId","name email")
      .lean();

    //   .populate("userId", "name email");
    console.log(cartItems);

    // const { items, shippingAddress, payment } = body;

    // if (!decode.id || !items || items.length === 0) {
    //   return NextResponse.json(
    //     { error: "User and items are required" },
    //     { status: 400 }
    //   );
    // }

    // ✅ Build order items with price + subtotal from product data
    // const populatedItems = await Promise.all(
    //   items.map(async (item: { product: string; quantity: number }) => {
    //     const product = await Product.findById(item.product);
    //     if (!product) {
    //       throw new Error(`Product not found: ${item.product}`);
    //     }
    //     const price = product.price;
    //     const subtotal = price * item.quantity;
    //     return {
    //       product: new mongoose.Types.ObjectId(item.product),
    //       quantity: item.quantity,
    //       price,
    //       subtotal,
    //     };
    //   })
    // );

    // ✅ Calculate total amount
    // const totalAmount = populatedItems.reduce(
    //   (sum, item) => sum + item.subtotal,
    //   0
    // );

    // ✅ Create new order
    // const newOrder = await Order.create({
    //   user: new mongoose.Types.ObjectId(decode.id),
    //   items: populatedItems,
    //   totalAmount,
    //   shippingAddress,
    //   payment,
    // });

    // await newOrder.save();

    return NextResponse.json({ cartItems }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
