import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Protegemos todas las rutas que comiencen con /admin, excepto la página de login
  if (path.startsWith("/admin") && !path.startsWith("/admin/login")) {
    const session = request.cookies.get("novaleap_admin_session");
    // Si no hay cookie de sesión autenticada, redirigimos al login
    if (!session || session.value !== "authenticated") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Si el usuario ya está autenticado e intenta ir a /admin/login, regresarlo al dashboard
  if (path === "/admin/login") {
    const session = request.cookies.get("novaleap_admin_session");
    if (session && session.value === "authenticated") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Aseguramos que el middleware solo actúe sobre las rutas de /admin y no interfiera con otras
  matcher: ["/admin/:path*"],
};
