import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    async function middleware(req) {
        console.log('Middleware', req.nextauth);
        const session = req.nextauth.token;
        const pathname = req.nextUrl.pathname;

        // If logged in, no username, and not on setup page, redirect
        if (session && !session.username && pathname !== '/auth/complete') {
            return NextResponse.redirect(new URL('/auth/complete', req.url));
        }
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token, // Require login for protected routes
        },
    }
);

export const config = {
    matcher: ['/admin/:path*'], // Apply to all routes except these
};
