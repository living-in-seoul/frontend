import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (request: NextRequest) => {
  const accessToken = request.cookies.get('accessToken');
  const refreshToken = request.cookies.get('refreshToken');
  if (!refreshToken) {
    // if (request.nextUrl.pathname.startsWith('/api')) {
    //   return NextResponse.json({ message: '회원전용입니다' });
    // }
    const { pathname, search, origin, basePath } = request.nextUrl;
    const signInUrl = new URL(`${basePath}/signin`, origin);
    signInUrl.searchParams.append(
      'callbackUrl',
      `${basePath}${pathname}${search}`,
    );
    return NextResponse.redirect(signInUrl);
  }

  if (request.nextUrl.pathname.startsWith('/api')) {
    const requestHeaders = new Headers(request.headers);
    accessToken &&
      requestHeaders.set('Authorization', `Bearer ${accessToken.value}`);
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

// 만료 됬을 때 로직 짜기  O

// porfile api 하나 만들고 로그인했을 때 profile 받아오지말고 딱 토큰만 받아오기 O

// rewrites를 통해서 소셜로그인 리다이렉트 문제를 해결해보자
