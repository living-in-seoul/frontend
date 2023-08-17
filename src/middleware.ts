import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (req: NextRequest) => {
  const accessToken = req.cookies.get('accessToken');
  if (!accessToken) {
    if (req.nextUrl.pathname.startsWith('/api')) {
      return NextResponse.json({ message: '회원전용입니다' });
    }
    const { pathname, search, origin, basePath } = req.nextUrl;
    const signInUrl = new URL(`${basePath}/signin`, origin);
    signInUrl.searchParams.append(
      'callbackUrl',
      `${basePath}${pathname}${search}`,
    );
    console.log('pathname', pathname);
    console.log(signInUrl);
    return NextResponse.redirect(signInUrl);
  }

  if (req.nextUrl.pathname.startsWith('/api')) {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('authorization', accessToken.value);
    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });
    return response;
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/api/:path*', '/write'],
};
