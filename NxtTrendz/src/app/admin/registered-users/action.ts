"use server";

import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { revalidatePath } from "next/cache";

export async function setRole(formData: FormData) {
  const id = formData.get("id") as string;
  const role = formData.get("role") as string;

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
