import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import User from "@/models/User";
import Address from "@/models/Address";
import { connectToDatabase } from "@/lib/db";

export async function GET() {
  await connectToDatabase();

  const cookie = await cookies();
  const token = cookie.get("token")?.value;

  if (!token) {
    return NextResponse.json({ loggedIn: false }, { status: 401 });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

    const user = await User.findById(decode.id).select("-password").lean();
    if (!user) {
      return NextResponse.json({ loggedIn: false }, { status: 404 });
    }

    // ✅ fetch default address
    const defaultAddress = await Address.findOne({
      userId: user._id,
      isDefault: true,
    }).lean();

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
          phone: user.phone || "Add Your Mobile Number",
          bio: user.bio || "Please add your bio",
          defaultAddress: defaultAddress || null, // 👈 include here
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Session error:", error);
    return NextResponse.json({ loggedIn: false }, { status: 500 });
  }
}
