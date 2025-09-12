import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_TOKEN_SECRET);

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  let user = null;

  if (token) {
    try {
      const { payload } = await jwtVerify(token, secret);
      user = payload; // decoded token with { id, role, ... }
      console.log("Decoded token:", payload);
    } catch (err) {
      console.error("Invalid/expired token:", err.message);
    }
  }

  // If not logged in, block protected routes
  if (
    !user &&
    (pathname.startsWith("/cart") ||
      pathname.startsWith("/admin") ||
      pathname.startsWith("/seller") ||
      pathname.startsWith("/profile"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Role-based access control
  if (pathname.startsWith("/admin") && user?.role !== "admin") {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (pathname.startsWith("/seller") && user?.role !== "seller") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Prevent logged-in users from accessing login/register
  if ((pathname === "/login" || pathname === "/register") && user) {
    if (user.role === "user" || user.role === "moderator") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (user.role === "seller") {
      return NextResponse.redirect(new URL("/seller", request.url));
    }
    if (user.role === "admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart/:path*",
    "/profile/:path*",
    "/login",
    "/register",
    "/admin/:path*",
    "/seller/:path*",
  ],
};
