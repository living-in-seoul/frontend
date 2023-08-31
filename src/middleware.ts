import { NextRequest, NextResponse } from 'next/server';
import { verifyAndRefreshToken } from './service/token';

export const middleware = async (request: NextRequest) => {
  const accessToken = request.cookies.get('accessToken');
  const refreshToken = request.cookies.get('refreshToken');
  const { pathname, search, origin, basePath } = request.nextUrl;
  const signInUrl = new URL(`${basePath}/signin`, origin);

  // if (!accessToken) {

  //   const nesSearch = search.split('=')[1] ?? 'home';
  //   const signInUrl = new URL(`${basePath}/signin`, origin);
  //   signInUrl.searchParams.append(
  //     'callbackUrl',
  //     `${basePath}${pathname}${search}`,
  //   );
  //   console.log(signInUrl);
  //   return NextResponse.redirect(signInUrl);
  // }
  //   if (refreshToken) {
  //     const verify = await verifyAndRefreshToken(accessToken, refreshToken);
  //     if (verify.status === 403) {
  //       return NextResponse.redirect(signInUrl);
  //     }
  //     if (verify.status === 201) {
  //       return NextResponse.redirect(signInUrl);
  //     }
  //   }
  //   if (request.nextUrl.pathname.startsWith('/api')) {
  //     const requestHeaders = new Headers(request.headers);
  //     accessToken &&
  //       requestHeaders.set('Authorization', `Bearer ${accessToken.value}`);
  //     const response = NextResponse.next({
  //       request: { headers: requestHeaders },
  //     });
  //     return response;
  //   }
  //   return NextResponse.next();
};

export const config = {
  matcher: [
    // '/write',
    // '/api/write',
    // '/api/liked',
    '/signin/:path*',
    // '/editprofile',
    '/mypage',
  ],
};

// rewrites를 통해서 소셜로그인 리다이렉트 문제를 해결해보자

// axios를 통해서 req를 조절을 해야할 필요가 있겠는데?
