import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (request: NextRequest) => {
  const accessToken = request.cookies.get('accessToken');
  const refreshToken = request.cookies.get('refreshToken');
  if (refreshToken) {
    const { pathname, search, origin, basePath } = request.nextUrl;
    console.log('여기서 뭘 가지고오니', search);
    const nesSearch = search.split('=')[1] ?? 'home';
    const signInUrl = new URL(`${basePath}/${nesSearch}`, origin);
    // signInUrl.searchParams.append(
    //   'callbackUrl',
    //   `${basePath}${pathname}${search}`,
    // );
    return NextResponse.redirect(signInUrl);
  }

  // if (request.nextUrl.pathname.startsWith('/api')) {
  //   const requestHeaders = new Headers(request.headers);
  //   accessToken &&
  //     requestHeaders.set('Authorization', `Bearer ${accessToken.value}`);
  //   const response = NextResponse.next({
  //     request: { headers: requestHeaders },
  //   });
  //   return response;
  // }
  console.log('미들웨어 거치는 지 확인하기');
  console.log('나 토큰', refreshToken);
  // 실험해보기 signin route에서 headers에 담기는지
  return NextResponse.next();
};

export const config = {
  matcher: [
    '/write',
    '/api/write',
    '/api/liked',
    '/signin/:path*',
    '/signup/first',
  ],
};

// 만료 됬을 때 로직 짜기  O

// porfile api 하나 만들고 로그인했을 때 profile 받아오지말고 딱 토큰만 받아오기 O

// rewrites를 통해서 소셜로그인 리다이렉트 문제를 해결해보자

// axios를 통해서 req를 조절을 해야할 필요가 있겠는데?
