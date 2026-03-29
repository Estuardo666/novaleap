import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	if (pathname === "/favicon.ico") {
		return NextResponse.rewrite(new URL("/icon.png", request.url));
	}

	if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
		const session = request.cookies.get("novaleap_admin_session");

		if (!session || session.value !== "authenticated") {
			return NextResponse.redirect(new URL("/admin/login", request.url));
		}
	}

	if (pathname === "/admin/login") {
		const session = request.cookies.get("novaleap_admin_session");

		if (session && session.value === "authenticated") {
			return NextResponse.redirect(new URL("/admin", request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/favicon.ico", "/admin/:path*"],
};