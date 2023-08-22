import { NextRequest, NextResponse } from 'next/server';

/** 토큰 재발급 */
export const refreshToken = async (request: NextRequest) => {
  const accessToken = request.cookies.get('accessToken');
  const refreshToken = request.cookies.get('refreshToken');
  console.log(refreshToken?.value);
  if (!accessToken) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/auth/refresh`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + refreshToken?.value,
        },
      },
    )
      .then((response) => response.json())
      .catch((error) => error.response);
    console.log('토큰 재발급 결과는 알아야지', response);
    if (response.status === 200) {
      console.log('리프레쉬토큰인데 한번 찍어보자', response);
      // 여기서 response의 accessToken을 setCookies 해주면 됨
      // cookies().set({
      //   name: 'accessToken',
      //   value: response.accessToken,
      //   httpOnly: true,
      //   path: '/',
      //   maxAge: 60,
      // })
    }
    if (response.status === 403) {
      console.log('여긴 403자리', response);
      const { pathname, search, origin, basePath } = request.nextUrl;
      const signInUrl = new URL(`${basePath}/signin`, origin);
      signInUrl.searchParams.append(
        'callbackUrl',
        `${basePath}${pathname}${search}`,
      );

      // 리다이렉트 시킬 수 있는 로직이 필요함
      // 통신구조를 이해할 필요가 있음
    }
  }
};

export const setAuthorization = (request: NextRequest) => {
  const token = request.cookies.get('accessToken');
  console.log('토큰 자체로 안나오던거 같은데', token);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('Authorization', `Bearer ${token?.value}`);
  console.log('헤더에 어썰러가 들어가는 건 맞니?', requestHeaders);
  return NextResponse.next({
    request: { headers: requestHeaders },
  });
};
