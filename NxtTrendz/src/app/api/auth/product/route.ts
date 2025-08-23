import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, brand, price, rating, categoryType, imageUrl } = body;
    console.log(title, brand, price, rating, categoryType, imageUrl);
    if (!title || !brand || !price || !rating || !categoryType || !imageUrl) {
      return NextResponse.json(
        { success: false, message: "All Details are Required" },
        { status: 400 }
      );
    }

    // Convert string values to numbers if needed
    const isPrice = Number(price);
    const isRating = Number(rating);

    // Validate price
    if (isNaN(isPrice) || isPrice <= 0) {
      return NextResponse.json(
        { success: false, message: "Price must be a positive number" },
        { status: 400 }
      );
    }

    // Validate rating
    if (isNaN(isRating) || isRating < 1 || isRating > 5) {
      return NextResponse.json(
        { success: false, message: "Rating must be a number between 1 and 5" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const product = await Product.create({
      title,
      brand,
      price,
      rating,
      categoryType,
      imageUrl,
    });
    return NextResponse.json(
      { success: true, message: "Product Added Succesfully", product },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
