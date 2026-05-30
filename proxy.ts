import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/src/shared/supabase/middleware';

export async function proxy(request: NextRequest) {
  const { response, user } = await updateSession(request);

  const pathname = request.nextUrl.pathname;

  const isAuthPage =
    pathname.startsWith('/auth/login') ||
    pathname.startsWith('/auth/register');

  const isDashboardPage =
    pathname.startsWith('/dashboard');

  if (!user && isDashboardPage) {
    return NextResponse.redirect(
      new URL('/auth/login', request.url)
    );
  }

  if (user && isAuthPage) {
    return NextResponse.redirect(
      new URL('/dashboard', request.url)
    );
  }

  return response;
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/login',
    '/auth/register',
  ],
};