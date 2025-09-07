import { connectToDatabase } from "@/lib/db";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { categoryName } = body;
    console.log(categoryName);

    if (!categoryName) {
      return NextResponse.json(
        {
          success: false,
          message: "Category Type is Required",
        },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const isCategoryTypeExist = await Category.findOne({ categoryName });
    console.log(isCategoryTypeExist);
    if (isCategoryTypeExist) {
      return NextResponse.json(
        {
          success: false,
          message: "Category Type is Already added",
        },
        { status: 400 }
      );
    }

    await Category.create({ categoryName });

    return NextResponse.json(
      { success: true, message: "Category added successfully", categoryName },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
  }
}
