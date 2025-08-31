import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { CustomJwtPayload } from "../../auth/cart/route";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

export async function PATCH() {
  try {
    const cookie = await cookies();
    const token = cookie.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decode = jwt.verify(
      token,
      process.env.JWT_TOKEN_SECRET!
    ) as CustomJwtPayload;

    await connectToDatabase();
    await User.findByIdAndUpdate(decode.id, {
      role: "requested",
    });
    return NextResponse.json(
      {
        success: true,
        message: "Requested Successfully For Becoming a Seller",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
