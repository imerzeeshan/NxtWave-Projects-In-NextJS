import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import User from "@/models/User";

export async function GET() {
  const cookie = await cookies();
  const token = cookie.get("token")?.value;

  if (!token) {
    return NextResponse.json({ loggedIn: false }, { status: 401 });
  }
  try {
    const decode = jwt.verify(
      token,
      process.env.JWT_TOKEN_SECRET
    ) ;
    const user = await User.findById(decode.id).select("-password");
    // console.log(decode, "session backend");
    return NextResponse.json(
      {
        loggedIn: true,
        token,
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          role: user.role,
          image: user.image,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ loggedIn: false }, { status: 500 });
  }
}
