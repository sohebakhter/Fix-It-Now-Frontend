import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtUtils } from './utils/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { getNewAccessToken } from './service/tokenRevalidation';

const AUTH_ROUTES = ['/login', '/signup'];

const PUBLIC_ROUTES = ['/', '/services',];

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const cookieStore = await cookies();

    let accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    let decodedAccessToken = accessToken ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string) : null;
    const decodedRefreshToken = refreshToken ? jwtUtils.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET as string) : null;

    if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
        const result = await getNewAccessToken();

        if (result.success) {
            const newAccessToken = result.data.accessToken;
            cookieStore.set("accessToken", newAccessToken, {
                httpOnly: true,
                // secure: true,
                sameSite: "lax",
                maxAge: 60 * 60 * 24 // 1 day
            });

            accessToken = newAccessToken
            decodedAccessToken = jwtUtils.verifyToken(accessToken!, process.env.JWT_ACCESS_SECRET as string);

        }
    }


    let userRole = null;

    if (!decodedAccessToken?.success) {
        cookieStore.delete("accessToken");
    }

    if (decodedAccessToken?.success) {
        userRole = (decodedAccessToken.data as JwtPayload).role;
    }

    if (accessToken && AUTH_ROUTES.includes(pathname)) {
        if (userRole === 'ADMIN') {
            return NextResponse.redirect(new URL('/admin-dashboard', request.url))
        } else if (userRole === 'TECHNICIAN') {
            return NextResponse.redirect(new URL('/technician-dashboard', request.url))
        } else if (userRole === 'CUSTOMER') {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        } else {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    const isAuthRoute = AUTH_ROUTES.some((route) => route === pathname || pathname.startsWith(`${route}/`));
    const isPublicRoute = PUBLIC_ROUTES.some((route) => route === pathname || pathname.startsWith(`${route}/`));
    if (!accessToken && !isPublicRoute && !isAuthRoute) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirectTo', pathname);
        return NextResponse.redirect(loginUrl)
    }


    if (pathname.startsWith("/dashboard") && userRole !== "CUSTOMER") {
        return NextResponse.redirect(new URL("/not-found", request.url))
    } else if (pathname.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
        return NextResponse.redirect(new URL("/not-found", request.url))
    }
    else if (pathname.startsWith("/technician-dashboard") && userRole !== "TECHNICIAN") {
        return NextResponse.redirect(new URL("/not-found", request.url))
    }

    // return NextResponse.redirect(new URL('/home', request.url))
    return NextResponse.next()
}

export const config = {
    matcher: [
        // Exclude API routes, static files, image optimizations, and .png files
        '/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)',
    ],
}