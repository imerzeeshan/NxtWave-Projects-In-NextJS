import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    // const { email, password } = Object.fromEntries(formData);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const user = await User.findOne({ email });
    // console.log(user);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User does not exist" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: "Invalid Password" },
        { status: 401 }
      );
    }

    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      {
        success: true,
        message: "Logged In",
        ...(process.env.NODE_ENV !== "production" && { token }),
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true, // prevents JS access
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: "strict", // prevents CSRF
      path: "/", // available across the site
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error) {
    console.error("Login error:", (error as Error).message);
    return NextResponse.json(
      { success: false, error: "Login Failed" },
      { status: 500 }
    );
  }
}
