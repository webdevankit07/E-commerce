import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get('access_token')?.value || '';

    const isAuthRoutes = path === '/sign-in' || path === '/sign-up';
    const isAdminRoute = path === '/admin/dashboard';

    if (isAdminRoute && !token) {
        return NextResponse.redirect(new URL('/admin/login', request.nextUrl));
    }

    if (isAuthRoutes && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    if (!isAuthRoutes && !token) {
        return NextResponse.redirect(new URL('/sign-in', request.nextUrl));
    }
}

export const config = {
    matcher: ['/sign-in', '/sign-up'],
};
