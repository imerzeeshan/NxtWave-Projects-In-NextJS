import { NextResponse, NextRequest } from "next/server";
import Product from "@/models/Product";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Cart from "@/models/Cart";
import { connectToDatabase } from "@/lib/db";
import Order from "@/models/Orders";
import Address from "@/models/Address";

export async function POST(req) {
  try {
    const body = await req.json();
    const { selectedAddressId, paymentMod } = body;
    console.log({ selectedAddressId });

    if (!selectedAddressId) {
      return NextResponse.json(
        { success: false, message: "Please Select Delivery Address" },
        { status: 401 }
      );
    }

    const cookie = await cookies();
    const token = cookie.get("token")?.value;
    if (!token)
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    const decode = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

    await connectToDatabase();
    const selectedAddress = await Address.findById(selectedAddressId).lean();

    if (!selectedAddress) {
      return NextResponse.json(
        { success: false, message: "Invalid Address" },
        { status: 400 }
      );
    }
    console.log({ selectedAddress });

    const cartItems = await Cart.find({ userId: decode.id })
      .populate("product")
      .populate("userId", "name email")
      .lean();

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
          seller: new mongoose.Types.ObjectId(item.product.seller),
          quantity: item.productCount,
          buyerEmail: decode.email,
          price,
          subtotal,
        };
      })
    );

    // console.log(populatedItems);

    // ✅ Calculate total amount
    const totalAmount = populatedItems.reduce(
      (sum, item) => sum + item.subtotal,
      0
    );

    // ✅ Create new order
    const newOrder = await Order.create({
      user: new mongoose.Types.ObjectId(decode.id),
      address: selectedAddress,
      buyerEmail: decode.email,
      items: populatedItems,
      totalAmount,
      paymentMod,
      payment: {
        method: paymentMod === "cod" ? "Cash On Delivery" : "Online",
        transactionId: "NA",
        status: "pending",
      },
      // shippingAddress,
    });

    console.log(newOrder.address);

    if (!newOrder) {
      throw Error("Something went wrong, Please try after sometime!");
    }

    const clearCart = await Cart.deleteMany({ userId: decode.id });
    console.log(clearCart);

    return NextResponse.json(
      {
        success: true,
        newOrder,
        address: newOrder.address,
        message: "Ordered Successfully",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);

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
    const decode = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

    const orders = await Order.find({ user: decode.id })
      .populate("items.product")
      .sort({
        createdAt: -1,
      })
      .lean();

    console.log({ orders });

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

export async function PUT(req) {
  try {
    const { orderId } = await req.json();

    await connectToDatabase();
    const order = await Order.findById(orderId);

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    order.status = "cancelled";

    order.items.forEach((item) => (item.status = "cancelled"));

    await order.save();
    console.log(order);

    return NextResponse.json(
      { success: true, message: "Order Cancelled", order },
      { status: 200 }
    );
  } catch (error) {
    console.error("Cancel order error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to cancel order" },
      { status: 500 }
    );
  }
}
