import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import { CustomJwtPayload } from "../../auth/cart/route";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  try {
    await connectToDatabase();
    const allUsers = await User.find({}).sort({ createdAt: -1 });
    if (!allUsers) {
      return NextResponse.json(
        {
          success: false,
          message: "No Users Found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Users Details are loaded",
        allUsers,
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

export async function PATCH(req: NextRequest) {
  try {
    const { role } = await req.json();
    console.log(role);

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
      role: role || "requested",
    });
    return NextResponse.json(
      {
        success: true,
        message: "Requested Successfully For Becoming a Seller",
        role,
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
