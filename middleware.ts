import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'rede-social-fallback-secret'
);

const publicPaths = ['/', '/login', '/registro', '/api/auth/login', '/api/auth/register'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicPath = publicPaths.some(path => 
    pathname === path || pathname.startsWith('/api/auth/')
  );

  const isStaticFile = pathname.startsWith('/_next') || 
                       pathname.startsWith('/favicon') ||
                       pathname.includes('.');

  if (isStaticFile) {
    return NextResponse.next();
  }

  const token = request.cookies.get('auth-token')?.value;

  if (isPublicPath) {
    if (token && (pathname === '/login' || pathname === '/registro')) {
      try {
        await jwtVerify(token, JWT_SECRET);
        return NextResponse.redirect(new URL('/grupos', request.url));
      } catch {
        const response = NextResponse.next();
        response.cookies.delete('auth-token');
        return response;
      }
    }
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    await jwtVerify(token, JWT_SECRET);
    return NextResponse.next();
  } catch {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('auth-token');
    return response;
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
