import Order from "@/models/Orders";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";

export async function PUT(req, { params }) {
  try {
    await connectToDatabase(); // ensure DB is connected

    const { id } = params; // order ID
    const { itemId, status } = await req.json();

    if (!itemId || !status) {
      return NextResponse.json(
        { success: false, message: "Item ID and status are required" },
        { status: 400 }
      );
    }

    // 1 Update the specific item's status
    const updatedOrder = await Order.findOneAndUpdate(
      { _id: id, "items._id": itemId },
      { $set: { "items.$.status": status } },
      { new: true }
    ).lean();

    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, message: "Order or item not found" },
        { status: 404 }
      );
    }

    // 2 Determine the overall order status
    const itemStatuses = updatedOrder.items.map((item) => item.status);

    let overallStatus = "pending";
    if (itemStatuses.every((s) => s === "delivered")) {
      overallStatus = "delivered";
    } else if (itemStatuses.every((s) => s === "out_for_delivery")) {
      overallStatus = "out_for_delivery";
    } else if (itemStatuses.some((s) => s === "shipped")) {
      overallStatus = "shipped";
    } else if (itemStatuses.some((s) => s === "processing")) {
      overallStatus = "processing";
    } else if (itemStatuses.some((s) => s === "cancelled")) {
      overallStatus = "cancelled";
    }

    // 3 Update the overall order status
    const finalOrder = await Order.findByIdAndUpdate(
      id,
      { status: overallStatus },
      { new: true }
    );

    return NextResponse.json(
      { success: true, order: finalOrder },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
