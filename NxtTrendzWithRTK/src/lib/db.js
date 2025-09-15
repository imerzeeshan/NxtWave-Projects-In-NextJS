import mongoose from "mongoose";

import "@/models/User";
import "@/models/Orders";
import "@/models/Product";
import "@/models/Cart";
import "@/models/Address";

const MONGODB_URI = process.env.MONGODB_URI;
console.log(MONGODB_URI);

if (!MONGODB_URI) {
  throw new Error("Please define mongodb uri in env file");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then(() => mongoose.connection);
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ MongoDB connected");
  } catch (error) {
    cached.promise = null;
    console.error("❌ MongoDB connection failed", error);
    throw error;
  }

  return cached.conn;
}
