import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get('access_token')?.value || '';

    const isAuthRoutes = path === '/login' || path === '/signup';
    const isPublicRoutes = path === '/';

    if (isAuthRoutes && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    if (!isAuthRoutes && !token && !isPublicRoutes) {
        return NextResponse.redirect(new URL('/sign-in', request.nextUrl));
    }
}

export const config = {
    matcher: ['/', '/login'],
};
