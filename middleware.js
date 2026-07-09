import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("admin-token")?.value;

  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    console.log("TOKEN:", token);

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // Skip verification temporarily
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};