"use server";

import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

export async function registerUser(prevState, formAction) {
  try {
    const { name, email, password, confirmPassword } =
      Object.fromEntries(formAction);

    if (password !== confirmPassword) {
      return { success: false, message: "Password is mismatch" };
    }

    console.log(name, email, password, confirmPassword);

    await connectToDatabase();

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return { success: false, message: "User Already Exist!" };
    }

    await User.create({ name, email, password });

    return { success: true, message: "User registered successfully!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Registration Failed!" };
  }
}

// <button
//           type="submit"
//           className={`w-full py-2 px-4 rounded-lg text-white font-medium transition
//               ${
//                 pending
//                   ? "bg-blue-400 cursor-not-allowed"
//                   : "bg-blue-600 hover:bg-blue-700"
//               }
//             `}
//         >
//           {pending ? "Registering..." : "Register"}
//         </button>
