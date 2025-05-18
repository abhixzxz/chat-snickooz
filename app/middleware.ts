import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

// List of paths that require authentication
const protectedPaths = [
  '/main-home',
  '/messages',
  '/profile',
];

// List of paths that are public
const publicPaths = [
  '/login',
  '/register',
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const path = request.nextUrl.pathname;

  // Check if the path requires authentication
  const isProtectedPath = protectedPaths.some(protectedPath => 
    path.startsWith(protectedPath)
  );

  // Check if the path is public
  const isPublicPath = publicPaths.some(publicPath => 
    path.startsWith(publicPath)
  );

  // If there's no token and trying to access protected path
  if (!token?.value && isProtectedPath) {
    // Clear any existing invalid token
    const response = NextResponse.redirect(new URL('/auth/login', request.url));
    response.cookies.delete('token');
    return response;
  }

  // If user has token and trying to access public path
  if (token?.value && isPublicPath) {
    return NextResponse.redirect(new URL('/main-home', request.url));
  }

  // For all other routes, proceed with the request
  const response = NextResponse.next();
  
  // Ensure token is properly set in response cookies if it exists
  if (token?.value) {
    response.cookies.set('token', token.value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });
  }

  return NextResponse.next();
}

// Configure the paths that trigger the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};