import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/db";
import Address from "@/models/Address";

export async function GET() {
  await connectToDatabase();

  const cookie = await cookies();
  const token = cookie.get("token")?.value;
  if (!token) return NextResponse.json([], { status: 401 });

  try {
    const decode = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    const addresses = await Address.find({ userId: decode.id });
    return NextResponse.json({ success: true, addresses }, { status: 200 });
  } catch (err) {
    return NextResponse.json([], { status: 401 });
  }
}

export async function POST(req) {
  await connectToDatabase();

  const cookie = await cookies();
  const token = cookie.get("token")?.value;
  if (!token)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const decode = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    const data = await req.json();
    console.log(data);

    if (data.isDefault) {
      await Address.updateMany(
        { userId: decode.id },
        { $set: { isDefault: false } }
      );
    }

    const newAddr = await Address.create({
      ...data,
      userId: decode.id,
    });

    return NextResponse.json({ success: true, newAddr }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(req) {
  try {
    const data = await req.json();
    console.log(data);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {}
}
