// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken"; // assuming you use JWT for auth

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  const { pathname } = request.nextUrl;
  const method = request.method;

  let userRole = "guest";

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        role: string;
      };
      userRole = decoded.role;
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }

  // ---- /cart -> logged in only ----
  if (pathname.startsWith("/cart")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // ---- /api/product ----
  /*if (pathname.startsWith("/api/product")) {
    if (method === "GET") {
      // Public access
      return NextResponse.next();
    }
    if (method === "POST") {
      // Only seller or admin
      if (!(userRole === "seller" || userRole === "admin")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }
  }*/

  // ---- /admin/product-upload -> admin only ----
  /*if (pathname.startsWith("/admin/product-upload")) {
    if (userRole !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }*/

  return NextResponse.next();
}

export const config = {
  //   matcher: ["/cart/:path*", "/api/product/:path*", "/admin/product-upload/:path*"],
};
