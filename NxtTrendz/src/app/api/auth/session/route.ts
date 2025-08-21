import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET() {
  const cookie = await cookies();
  const token = cookie.get("token")?.value;

  if (!token) {
    return NextResponse.json({ loggedIn: false }, { status: 401 });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_TOKEN_SECRET!);
    return NextResponse.json({ loggedIn: true, user: decode }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ loggedIn: false }, { status: 500 });
  }
}
