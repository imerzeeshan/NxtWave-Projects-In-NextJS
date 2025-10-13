import { NextResponse } from "next/server";
import Product from "@/models/Product";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Cart from "@/models/Cart";
import { connectToDatabase } from "@/lib/db";
import Order from "@/models/Orders";

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

    connectToDatabase();
    const orders = await Order.find({})
      .populate("items.product")
      .sort({
        createdAt: -1,
      })
      .lean();

    const myProductOrders = orders
      .map((order) => {
        const filteredItems = order.items.filter(
          (item) => String(item.seller) === String(decode.id)
        );
        if (filteredItems.length > 0) {
          return { ...order, items: filteredItems };
        }
        return null;
      })
      .filter((order) => order !== null);

    console.log(myProductOrders);
    // console.log(orders[0].items[0].seller);

    return NextResponse.json(
      { success: true, myProductOrders },
      { status: 200 }
    );
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
