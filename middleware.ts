import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_FILE_PATTERN = /\.[^/]+$/;

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	if (pathname === "/favicon.ico") {
		return NextResponse.rewrite(new URL("/icon.png", request.url));
	}

	if (
		pathname.startsWith("/_next") ||
		pathname.startsWith("/api") ||
		PUBLIC_FILE_PATTERN.test(pathname)
	) {
		return NextResponse.next();
	}

	const response = NextResponse.next();
	response.headers.set("Cache-Control", "no-store, max-age=0, must-revalidate");

	return response;
}

export const config = {
	matcher: ["/((?!_next/static|_next/image).*)"],
};