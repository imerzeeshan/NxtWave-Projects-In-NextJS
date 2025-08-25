import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Product";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find({});
    if (!products) {
      return NextResponse.json(
        {
          success: false,
          message: "No Products Found",
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: true, message: "Products Founded", products },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Sever Error",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // console.log(body);
    const { title, brand, price, rating, category, url, thumbnailUrl, fileId } =
      body;
    // console.log(title, brand, price, rating, category);

    if (
      !title ||
      !brand ||
      !price ||
      !rating ||
      !category ||
      !url ||
      !fileId ||
      !thumbnailUrl
    ) {
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
      category,
      image: { url, fileId, thumbnailUrl },
    });
    revalidatePath("/product");
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
