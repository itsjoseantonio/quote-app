import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export default withAuth(
    async function middleware(req) {
        const pathname = req.nextUrl.pathname;
        const token = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET,
        });

        // 🚨 Check if the user is logged in
        if (token) {
            if (!token.username && pathname !== '/auth/complete') {
                console.log('condition username');
                return NextResponse.redirect(
                    new URL('/auth/complete', req.url)
                );
            }

            if (pathname === '/login') {
                return NextResponse.redirect(new URL('/dashboard', req.url));
            }
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: ['/admin/:path*'],
};
