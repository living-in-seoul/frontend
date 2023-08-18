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
  matcher: ['/write', '/api/write'],
};

// 만료 됬을 때 로직 짜기

// porfile api 하나 만들고 로그인했을 때 profile 받아오지말고 딱 토큰만 받아오기

// rewrites를 통해서 소셜로그인 리다이렉트 문제를 해결해보자
