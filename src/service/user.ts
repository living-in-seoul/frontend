import { redirect } from 'next/navigation';
import { instance } from './instance';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/** 회원가입 필수사항 시 */
export const postSignup = async (data: RequestEssentialRegister) => {
  const response = await instance
    .post(`/auth/signup1`, data)
    .then((response) => response.data)
    .catch((error) => error.response);
  return response;
};
/** 회원가입 선택사항 시 */
export const putSignup = async (data: RequestNonessentialRegister) => {
  const { email } = data;
  delete data.email;
  const response = await instance
    .put(`/auth/signup2?email=${email}`, data)
    .then((response) => response.data)
    .catch((error) => error.response);
  return response;
};

/** 로그인 시 */
export const postSingin = async (data: RequestLogin) => {
  const response = await instance
    .post(`/auth/login`, data)
    .then((response) => response.data)
    .catch((error) => error.response);
  return response;
};

export async function oauthHandler(url: string) {
  redirect(url);
}
/** 소셜로그인 시 */
export const oauthSignin = async (data: RequestOauthLogin) => {
  await fetch(`${process.env.NEXT_PUBLIC_SERVER}/auth/oauth/login`, {
    method: 'POST',
    body: JSON.stringify(data),
  }).then((response) => response.json());
};

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
