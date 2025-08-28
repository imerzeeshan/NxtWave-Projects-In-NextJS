import { connectToDatabase } from "@/lib/db";
import Cart from "@/models/Cart";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

interface CustomJwtPayload extends jwt.JwtPayload {
  id: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { product, userId } = body;
    console.log(product);

    if (!product || !userId) {
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
      { userId, product },
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
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const cookie = await cookies();
    const token = cookie.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Please Login Your Account First!" },
        { status: 401 }
      );
    }

    const decode = jwt.verify(
      token,
      process.env.JWT_TOKEN_SECRET!
    ) as CustomJwtPayload;

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
      {
        $project: {
          _id: 1,
          productCount: 1,
          "productDetails._id": 1,
          "productDetails.title": 1,
          "productDetails.price": 1,
          "productDetails.brand": 1,
          "productDetails.image": 1,
        },
      },
    ]);

    // const products = await Cart.find({ userId: (decode as jwt.JwtPayload).id });
    console.log(products);
    // revalidatePath("/cart");
    return NextResponse.json({ success: true, products }, { status: 200 });
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

export async function PATCH(req: NextRequest) {
  try {
    const { product, userId, action } = await req.json();
    await connectToDatabase();
    if (action === "increase") {
      await Cart.findOneAndUpdate(
        { product, userId },
        { $inc: { productCount: 1 } },
        { new: true }
      );
    } else if (action === "decrease") {
      await Cart.findOneAndUpdate(
        { product, userId, productCount: { $gt: 1 } },
        { $inc: { productCount: -1 } },
        { new: true }
      );
    } else {
      await Cart.findOneAndDelete({ product, userId });
    }
    revalidatePath("/cart");
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await req.json();

    await Cart.deleteMany({ userId });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
