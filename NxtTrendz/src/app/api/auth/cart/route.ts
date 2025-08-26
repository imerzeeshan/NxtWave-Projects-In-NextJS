import { connectToDatabase } from "@/lib/db";
import Cart from "@/models/Cart";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

interface CustomJwtPayload extends jwt.JwtPayload {
  id: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, userId, productCount, title, brand } = body;
    // console.log(productId);

    if (!productId || !userId || !productCount || !title || !brand) {
      return NextResponse.json(
        {
          success: false,
          message: "Please add after sometime!",
        },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const updatedCartItem = await Cart.findOneAndUpdate(
      { userId, productId },
      { $inc: { productCount: 1 } },
      { new: true, upsert: true }
    );
    console.log(updatedCartItem);

    return NextResponse.json(
      {
        success: true,
        message: "Product Added in Cart",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
  }
}

export async function GET() {
  try {
    const cookie = await cookies();
    const token = cookie.get("token")?.value;
    if (token) {
      const decode = jwt.verify(
        token,
        process.env.JWT_TOKEN_SECRET!
      ) as CustomJwtPayload;
      if (decode) {
        console.log(decode.id);
        await connectToDatabase();
        const products = await Cart.aggregate([
          {
            $match: {
              userId: new mongoose.Types.ObjectId(decode.id),
            },
          },
          {
            $lookup: {
              from: "products",
              localField: "productId",
              foreignField: "_id",
              as: "productDetails",
            },
          },
          {
            $unwind: "$productDetails",
          },
        ]);

        // const products = await Cart.find({ userId: (decode as jwt.JwtPayload).id });
        console.log(products);
        if (products) {
          return NextResponse.json({ products });
        }
      }
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
  }
}
