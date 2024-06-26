import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token: unknown = request.cookies.get('access_token')?.value || '';

    const isAuthRoutes = path === '/sign-in' || path === '/sign-up';
    const isAdminRoutes = path === '/admin/dashboard';

    if (isAuthRoutes && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    if (isAdminRoutes && !token) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    if (!isAuthRoutes && !token) {
        return NextResponse.redirect(new URL('/sign-in', request.nextUrl));
    }
}

export const config = {
    matcher: ['/sign-in', '/sign-up', '/admin/dashboard', '/admin/dashboard/'],
};
