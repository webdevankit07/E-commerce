import { NextResponse, type NextRequest } from 'next/server';
import { ConnectDB } from './config/connectDB';

export function middleware(request: NextRequest) {
    ConnectDB();
    const path = request.nextUrl.pathname;
    const token = request.cookies.get('access_token')?.value || '';

    const isAuthRoutes = path === '/sign-in' || path === '/sign-up';

    if (isAuthRoutes && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    if (!isAuthRoutes && !token) {
        return NextResponse.redirect(new URL('/sign-in', request.nextUrl));
    }
}

export const config = {
    matcher: ['/sign-in', '/sign-up', '/admin/dashboard', '/admin/login'],
};
