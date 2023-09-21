import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (request: NextRequest) => {
  const accessToken = request.cookies.get('accessToken');
  const refreshToken = request.cookies.get('refreshToken');
  const { pathname, search, origin, basePath } = request.nextUrl;
  const signinPage = request.nextUrl.pathname.startsWith('/signin');
  const signupPage = request.nextUrl.pathname.startsWith('/signup');

  // 토큰 검증 로직 추가
  // if (accessToken && refreshToken) {
  //   const isValid = await verifyAndRefreshToken();
  //   if (!isValid) {
  //     const signInUrl = new URL(`${basePath}/signin`, origin);
  //     return NextResponse.redirect(signInUrl);
  //   }
  // }

  if (signupPage || signinPage) {
    if (refreshToken) {
      const homeUrl = new URL(`${basePath}/home`, origin);
      return NextResponse.redirect(homeUrl);
    }
    return NextResponse.next();
  }

  // if (!refreshToken) {
  //   const signInUrl = new URL(`${basePath}/signin`, origin);
  //   signInUrl.searchParams.append(
  //     'callbackUrl',
  //     `${basePath}${pathname}${search}`,
  //   );
  //   return NextResponse.redirect(signInUrl);
  // }

  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  /**
   * cspHeader 설정
   */
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
  `;

  const requestHeaders = new Headers();
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set(
    'Content-Security-Policy',
    cspHeader.replace(/\s{2,}/g, ' ').trim(),
  );

  return NextResponse.next({ headers: requestHeaders });
};

export const config = {
  matcher: ['/mypage', '/write', '/editprofile/:path*'],
};
