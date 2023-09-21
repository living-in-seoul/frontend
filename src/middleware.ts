import { NextRequest, NextResponse } from 'next/server';
import { verifyAndRefreshToken } from './service/token';

export const middleware = async (request: NextRequest) => {
  const accessToken = request.cookies.get('accessToken');
  const refreshToken = request.cookies.get('refreshToken');
  const { pathname, search, origin, basePath } = request.nextUrl;
  const signinPage = request.nextUrl.pathname.startsWith('/signin');
  const signupPage = request.nextUrl.pathname.startsWith('/signup');
  // if (pathname === '/') {
  //   const signInUrl = new URL(`${basePath}/home`, origin);
  //   return NextResponse.redirect(signInUrl);
  // }

  if (signupPage || signinPage) {
    if (refreshToken) {
      const signInUrl = new URL(`${basePath}/home`, origin);

      return NextResponse.redirect(signInUrl);
    }
    return NextResponse.next();
  }
  if (!refreshToken) {
    // signinpage로 보내는 것을 생각해보았지만
    const signInUrl = new URL(`${basePath}/signin`, origin);
    signInUrl.searchParams.append(
      'callbackUrl',
      `${basePath}${pathname}${search}`,
    );
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
  // return NextResponse.next();
  // pathname시작을 user로 하고 startWith해가지고 user로 시작하면 토큰 있을떄 없을때 비교하고
  // 다른걸로 시작하면 이제 못들어가게끔 막는 로직을 짜보자
};

export const config = {
  matcher: [
    // '/api/write',
    // '/api/liked',
    // '/signin/:path*',
    '/mypage',
    // '/alert',
    '/write',
    '/editprofile/:path*',
    // '/signup/first',
    // '/signin',
  ],
};

// rewrites를 통해서 소셜로그인 리다이렉트 문제를 해결해보자

// axios를 통해서 req를 조절을 해야할 필요가 있겠는데?
