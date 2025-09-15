import User from "@/models/User";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/db";

export async function GET() {
  try {
    const cookie = await cookies();
    const token = cookie.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decode = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

    await connectToDatabase();
    const user = await User.findById(decode.id);
    return;
  } catch (error) {}
}

export async function PATCH(req) {
  try {
    const { url, thumbnailUrl, fileId, action, phone, bio } = await req.json();
    console.log({ action, phone, bio });

    // console.log(url, thumbnailUrl, fileId, action);

    const cookie = await cookies();
    const token = cookie.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decode = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

    let user;

    await connectToDatabase();
    if (action === "upload") {
      user = await User.findByIdAndUpdate(
        decode.id,
        {
          image: { url, fileId, thumbnailUrl },
        },
        { new: true }
      ).select("-password");
      return NextResponse.json(
        {
          success: true,
          user,
          message: "Profile Image has been changed",
        },
        { status: 200 }
      );
    }

    if (action === "remove") {
      user = await User.findByIdAndUpdate(
        decode.id,
        {
          image: null,
        },
        { new: true }
      ).select("-password");
      return NextResponse.json(
        {
          success: true,
          user,
          message: "Profile Image has been changed",
        },
        { status: 200 }
      );
    }

    if (action === "phone") {
      user = await User.findByIdAndUpdate(
        decode.id,
        { phone: phone },
        { new: true }
      ).select("-password");

      return NextResponse.json(
        {
          success: true,
          user,
          message: "Phone has been updated successfully",
        },
        { status: 201 }
      );
    }

    if (action === "bio") {
      user = await User.findByIdAndUpdate(
        decode.id,
        { bio: bio },
        { new: true }
      ).select("-password");

      return NextResponse.json(
        {
          success: true,
          user,
          message: "Bio Addedd Successfully",
        },
        { status: 201 }
      );
    }

    console.log({ user });
    return NextResponse.json(
      { success: false, message: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

// export async function PUT() {
//   try {
//     const cookie = await cookies();
//     const token = cookie.get("token")?.value;

//     if (!token) {
//       return NextResponse.json(
//         { success: false, message: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     const decode = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

//     await connectToDatabase();
//     const user = await User.findByIdAndUpdate(
//       decode.id,
//       {
//         image: null,
//       },
//       { new: true }
//     ).select("-password");

//     console.log(user, "profile route");

//     return NextResponse.json(
//       {
//         success: true,
//         user,
//         message: "Profile Image has been removed",
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Internal Server Error",
//       },
//       { status: 500 }
//     );
//   }
// }
