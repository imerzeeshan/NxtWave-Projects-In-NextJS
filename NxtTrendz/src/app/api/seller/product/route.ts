import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Product";

export interface CustomJwtPayload extends jwt.JwtPayload {
  id: string;
}

export async function GET() {
  try {
    const cookie = await cookies();
    const token = cookie.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized user, Please Login" },
        { status: 401 }
      );
    }
    const decode = jwt.verify(
      token,
      process.env.JWT_TOKEN_SECRET!
    ) as CustomJwtPayload;
    await connectToDatabase();
    const products = await Product.find({ seller: decode.id });
    return NextResponse.json({ success: true, products }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
