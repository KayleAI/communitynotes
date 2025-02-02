import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (
    request.nextUrl.pathname.startsWith("/api/extension")
  ) {
    const origin = request.headers.get("origin");
		console.log(origin);

    // Add CORS headers
    response.headers.set("Access-Control-Allow-Origin", origin ?? "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS",
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type",
    );
    response.headers.set("Access-Control-Allow-Credentials", "true");
  }

  return response;
}

// Configure which paths should be handled by this middleware
export const config = {
  matcher: "/api/extension/:path*",
};
