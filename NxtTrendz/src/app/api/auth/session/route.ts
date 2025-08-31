import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import User from "@/models/User";
import { CustomJwtPayload } from "../cart/route";

export async function GET() {
  const cookie = await cookies();
  const token = cookie.get("token")?.value;

  if (!token) {
    return NextResponse.json({ loggedIn: false }, { status: 401 });
  }
  try {
    const decode = jwt.verify(
      token,
      process.env.JWT_TOKEN_SECRET!
    ) as CustomJwtPayload;
    const user = await User.findById(decode.id).select("-password");
    console.log(decode, "session backend");
    return NextResponse.json({ loggedIn: true, user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ loggedIn: false }, { status: 500 });
  }
}
