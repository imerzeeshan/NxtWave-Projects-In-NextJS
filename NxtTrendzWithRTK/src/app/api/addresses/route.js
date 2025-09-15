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
    return NextResponse.json(addresses);
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

    const newAddr = await Address.create({
      ...data,
      userId: decode.id,
    });

    return NextResponse.json(newAddr);
  } catch (err) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
