import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const isAuth = !!token;
  const isGuest = req.cookies.get('toeic_guest_mode')?.value === '1';
  const isAuthPage = req.nextUrl.pathname.startsWith('/login');
  const isLandingPage = req.nextUrl.pathname.startsWith('/landing');

  // If on login page, redirect to home if already authenticated
  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    return null; // let them see the login page (including guests wishing to sign in)
  }

  // If on landing page, redirect to home if already authenticated or already in guest mode
  if (isLandingPage) {
    if (isAuth || isGuest) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    return null; // let them see the landing page
  }
  
  // Bypass for E2E tests
  if (req.headers.get('x-playwright-test') === 'true') {
    return null;
  }

  // If NOT authenticated and NOT guest, enforce protection
  if (!isAuth && !isGuest) {
    let from = req.nextUrl.pathname;
    if (req.nextUrl.search) {
      from += req.nextUrl.search;
    }
    
    // If they just hit the root URL, send them to the landing page instead of login
    if (from === '/') {
      return NextResponse.redirect(new URL('/landing', req.url));
    }
    
    // For any other protected route, send to login
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${encodeURIComponent(from)}`, req.url)
    );
  }
}

export const config = {
  // Apply to all routes except API, static assets, and manifest
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|manifest.json).*)'],
};
