// src/middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value; // 👈 save this on login
  const { pathname } = request.nextUrl;

  const isLoggedIn = !!token;
  console.log(isLoggedIn, pathname, role);

  // --- Redirect logged in users away from /login ---
  if ((pathname === "/login" || pathname === "/register") && isLoggedIn) {
    if (role === "user") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (role === "seller") {
      return NextResponse.redirect(new URL("/seller", request.url));
    }
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  // --- Protect /cart (logged in only) ---
  if (pathname.startsWith("/cart") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // --- Protect /admin routes (admin only) ---
  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // --- Protect /seller routes (seller only) ---
  if (pathname.startsWith("/seller") && role !== "seller") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart/:path*",
    "/login",
    "/register",
    "/admin/:path*",
    "/seller/:path*",
  ],
};

// // src/middleware.ts
// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken"; // assuming you use JWT for auth

// export function middleware(request) {
//   const token = request.cookies.get("token")?.value;
//   const { pathname } = request.nextUrl;
//   const method = request.method;

//   let userRole = null;
//   console.log(token, pathname);

//   if (token) {
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       userRole = decoded.role;
//       console.log(decoded, "middleware");
//     } catch (err) {
//       console.error("Invalid token:", err);
//     }
//   }

//   // Role-based redirect on login
//   if (pathname.startsWith("/login") && userRole) {
//     if (userRole === "user") {
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//     if (userRole === "seller") {
//       return NextResponse.redirect(new URL("/seller", request.url));
//     }
//     if (userRole === "admin") {
//       return NextResponse.redirect(new URL("/admin/dashboard", request.url));
//     }
//   }

//   // ---- /cart -> logged in only ----
//   if (pathname.startsWith("/cart")) {
//     if (!token) {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//     return NextResponse.next();
//   }

//   // ---- /api/product ----
//   /*if (pathname.startsWith("/api/product")) {
//     if (method === "GET") {
//       // Public access
//       return NextResponse.next();
//     }
//     if (method === "POST") {
//       // Only seller or admin
//       if (!(userRole === "seller" || userRole === "admin")) {
//         return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//       }
//     }
//   }*/

//   // ---- /admin/product-upload -> admin only ----
//   /*if (pathname.startsWith("/admin/product-upload")) {
//     if (userRole !== "admin") {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//   }*/

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/cart/:path*", "/login"],
//   // matcher: ["/cart/:path*", "/api/product/:path*", "/admin/product-upload/:path*"],
// };
