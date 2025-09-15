import { NextResponse } from "next/server";
import Address from "@/models/Address";
import { connectToDatabase } from "@/lib/db";

export async function PUT(req, { params }) {
  const data = await req.json();
  await connectToDatabase();
  const updated = await Address.findByIdAndUpdate(params.id, data, {
    new: true,
  });
  return NextResponse.json(updated);
}
