import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const { name, email, password, confirmPassword } =
      Object.fromEntries(formData);

    if (password !== confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Password is Mismatched!",
        },
        { status: 400 }
      );
    }

    console.log(name, email, password, confirmPassword);

    await connectToDatabase();

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return NextResponse.json(
        {
          success: false,
          message: "User Already Exist!",
        },
        { status: 401 }
      );
    }

    await User.create({ name, email, password });

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully!",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Registration Failed!",
        error,
      },
      { status: 500 }
    );
  }
}
