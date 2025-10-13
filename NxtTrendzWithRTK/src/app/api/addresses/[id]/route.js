import { NextResponse } from "next/server";
import Address from "@/models/Address";
import { connectToDatabase } from "@/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function PUT(req, { params }) {
  const data = await req.json();

  const cookie = await cookies();
  const token = cookie.get("token")?.value;
  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
  const decode = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

  try {
    await connectToDatabase();

    if (data.isDefault) {
      await Address.updateMany(
        { userId: decode.id },
        { $set: { isDefault: false } }
      );
    }

    await Address.findByIdAndUpdate(params.id, data, {
      new: true,
    });
    return NextResponse.json(
      { success: true, message: "Successfully Address  Updated " },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error },
      { status: 401 }
    );
  }
}
