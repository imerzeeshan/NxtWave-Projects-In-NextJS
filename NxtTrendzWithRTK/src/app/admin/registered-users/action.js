"use server";

import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { revalidatePath } from "next/cache";

export async function setRole(formData) {
  const id = formData.get("id");
  const role = formData.get("role");

  try {
    await connectToDatabase();
    await User.findByIdAndUpdate(id, {
      role: role,
    });
    revalidatePath("/admin/registered-users");
  } catch (error) {
    console.error(error);
  }
}
