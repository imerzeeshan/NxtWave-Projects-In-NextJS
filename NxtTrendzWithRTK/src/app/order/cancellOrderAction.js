"use server";

import { connectToDatabase } from "@/lib/db";
import Order from "@/models/Orders";
import { revalidatePath } from "next/cache";

export async function CancelOrderAction(orderId) {
  try {
    await connectToDatabase();

    await Order.findByIdAndUpdate(
      orderId,
      {
        $set: {
          status: "cancelled",
          "items.$[].status": "cancelled",
        },
      },
      { new: true, lean: true, runValidators: true }
    );

    revalidatePath("/order");

    return {
      success: true,
      message: "Order Cancelled",
    };
  } catch (error) {
    console.error("Cancel order error:", error);
    return {
      success: false,
      message: "Failed to cancel order",
    };
  }
}

export async function RemoveOrderFromOrderList(orderId) {
  try {
    await connectToDatabase();
    await Order.findByIdAndDelete(orderId, {
      new: true,
      lean: true,
      runValidators: true,
    });

    return { success: true, message: "Order Removed" };
  } catch (error) {
    console.error("Remove order error:", error);
    return {
      success: false,
      message: "Failed to remove order",
    };
  }
}
