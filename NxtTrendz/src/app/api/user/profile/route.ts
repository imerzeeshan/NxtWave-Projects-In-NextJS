import User from "@/models/User";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import { CustomJwtPayload } from "../../auth/cart/route";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/db";

export async function GET() {
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
    const user = await User.findById(decode.id);
    return;
  } catch (error) {}
}

export async function PATCH(req: NextRequest) {
  try {
    const { url, thumbnailUrl, fileId } = await req.json();
    console.log(url, thumbnailUrl, fileId);

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
    const user = await User.findByIdAndUpdate(decode.id, {
      image: { url, fileId, thumbnailUrl },
    }).select("-password");

    console.log(user);

    return NextResponse.json(
      {
        success: true,
        message: "Profile Image has been changed",
      },
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

export async function PUT() {
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
    const user = await User.findByIdAndUpdate(decode.id, {
      image: {},
    }).select("-password");

    console.log(user, "profile route");

    return NextResponse.json(
      {
        success: true,
        message: "Profile Image has been removed",
      },
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
