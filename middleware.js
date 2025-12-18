import { NextResponse } from "next/server";

/**
 * middleware จะรันทุก request ที่ match
 */
export function middleware(request) {
  const authCookie = request.cookies.get("auth");

  // 🔎 DEBUG (ชั่วคราว)
  console.log("MIDDLEWARE PATH =", request.nextUrl.pathname);
  console.log("MIDDLEWARE COOKIE =", authCookie);

  // ❌ ไม่มี cookie → block
  if (
    !authCookie &&
    request.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  return NextResponse.next();
}

// ✅ matcher ต้องเป็นแบบนี้
export const config = {
  matcher: ["/dashboard/:path*"],
};
