import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function isAllowed(request: NextRequest) {
  // ローカルからのアクセスを許可
  const { hostname } = request.nextUrl;
  const isLocal = hostname.includes("localhost");

  // microCMSからのアクセスを許可
  const referer = request.headers.get("referer") || "";

  const isMicroCMS =
    referer.includes("microcms.io") || referer.includes("microcms.app");

  return isLocal || isMicroCMS;
}

export function middleware(request: NextRequest) {
  if (!isAllowed(request)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/custom-field/:path*"],
};
