import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const authCookie = request.cookies.get("admin_auth");
    const isAuth = authCookie?.value === "true";
    const isLoginPage = request.nextUrl.pathname === "/admin/login";
    const isAdminPage = request.nextUrl.pathname.startsWith("/admin");

    // If trying to access admin pages (except login) and not authenticated
    if (isAdminPage && !isLoginPage && !isAuth) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // If trying to access login page and already authenticated
    if (isLoginPage && isAuth) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
