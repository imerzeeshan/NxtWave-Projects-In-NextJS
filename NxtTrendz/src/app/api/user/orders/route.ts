import { NextResponse, NextRequest } from "next/server";
import Product from "@/models/Product";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { CustomJwtPayload } from "../../seller/product/route";
import Cart from "@/models/Cart";
import { connectToDatabase } from "@/lib/db";
import Order from "@/models/Orders";

interface PopulatedCartItems {
  product: {
    _id: string;
    price: number;
  };
  productCount: number;
}

export async function POST(req: NextRequest) {
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
      .populate("userId", "name email")
      .lean();

    //   .populate("userId", "name email");
    // console.log(cartItems);

    // const { items, shippingAddress, payment } = body;

    if (!decode.id || !cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { error: "User and items are required" },
        { status: 400 }
      );
    }

    // ✅ Build order items with price + subtotal from product data
    const populatedItems = await Promise.all(
      cartItems.map(async (item) => {
        // console.log(item);
        const product = await Product.findById(item.product);
        if (!product) {
          throw new Error(`Product not found: ${item.product}`);
        }
        const price = product.price;
        const subtotal = price * item.productCount;
        return {
          product: new mongoose.Types.ObjectId(item.product._id),
          quantity: item.productCount,
          price,
          subtotal,
        };
      })
    );

    console.log(populatedItems);

    // ✅ Calculate total amount
    const totalAmount = populatedItems.reduce(
      (sum, item) => sum + item.subtotal,
      0
    );

    // ✅ Create new order
    const newOrder = await Order.create({
      user: new mongoose.Types.ObjectId(decode.id),
      items: populatedItems,
      totalAmount,
      // shippingAddress,
      // payment,
    });

    if (!newOrder) {
      throw Error("Something went wrong, Please try after sometime!");
    }

    const clearCart = await Cart.deleteMany({ userId: decode.id });
    console.log(clearCart);

    return NextResponse.json(
      { newOrder, message: "Order Successful" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

export async function GET() {
  try {
    const cookie = await cookies();
    const token = cookie.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized Please login",
        },
        { status: 401 }
      );
    }
    const decode = jwt.verify(
      token,
      process.env.JWT_TOKEN_SECRET!
    ) as CustomJwtPayload;

    const orders = await Order.find({ user: decode.id })
      .populate("items.product")
      .sort({
        createdAt: -1,
      })
      .lean();

    return NextResponse.json({ success: true, orders }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
