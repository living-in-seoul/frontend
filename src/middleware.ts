import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (req: NextRequest) => {
  const accessToken = req.cookies.get('accessToken');
  const refreshToken = req.cookies.get('refreshToken');
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
  // 이부분 때려맞춘거임 오늘 API 나오면 그때 끝장을 내봅시다!!! 으아아아아아아아!!!!
  const getProfile = async () => {
    const responnse = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/auth/profile`,
      {
        method: 'GET',
        headers: {
          contentType: 'application/json',
          Authorization: accessToken.value,
        },
      },
    ).then((response) => response.json());
    if (responnse.message === '토큰이 만료되었습니다') {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER}/auth/refresh`, {
        method: 'POST',
        body: JSON.stringify(refreshToken),
      }).then((response) => response.json());
      responnse.message = 'refreshToken이 만료되었습니다' && redirect('/');
    }
  };
  getProfile();

  return NextResponse.next();
};

export const config = {
  matcher: ['/write', '/api/write'],
};

// 만료 됬을 때 로직 짜기  O

// porfile api 하나 만들고 로그인했을 때 profile 받아오지말고 딱 토큰만 받아오기 O

// rewrites를 통해서 소셜로그인 리다이렉트 문제를 해결해보자
