import { connectToDatabase } from "@/lib/db";
import Address from "@/models/Address";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { addressId } = await req.json();

  const cookie = await cookies();
  const token = cookie.get("token")?.value;

  const decode = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

  console.log({ addressId });

  await connectToDatabase();
  await Address.updateMany(
    { userId: decode.id },
    { $set: { isDefault: false } }
  );

  await Address.findByIdAndUpdate(
    addressId,
    { $set: { isDefault: true } },
    { new: true }
  );

  return NextResponse.json(
    { success: true, message: "Default address updated" },
    { status: 201 }
  );
}
