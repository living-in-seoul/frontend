import { redirect } from 'next/navigation';
import { instance } from './instance';
import { NextRequest, NextResponse } from 'next/server';

/**회원가입 시 */
export const postSignup = async (data: RequestRegister) => {
  const response = await instance
    .post(`/auth/signup`, data)
    .then((response) => response.data)
    .catch((error) => error.response);
  return response;
};

/**로그인 시 */
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
/**소셜로그인 시 */
export const oauthSignin = async (data: RequestOauthLogin) => {
  await fetch(`${process.env.NEXT_PUBLIC_SERVER}/auth/oauth/login`, {
    method: 'POST',
    body: JSON.stringify(data),
  }).then((response) => response.json());
};

/**유저프로필 가져오기 및 토큰 재발급 */
export const getProfile = async (request: NextRequest) => {
  const accessToken = request.cookies.get('accessToken');
  const refreshToken = request.cookies.get('refreshToken');
  if (accessToken) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/auth/profile`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + refreshToken?.value,
        },
      },
    );
    if (response.status === 200) {
      // 여기서 response의 accessToken을 setCookies 해주면 됨
      // cookies().set({
      //   name: 'accessToken',
      //   value: data.accessToken,
      //   httpOnly: true,
      //   path: '/',
      //   maxAge: 60,
      // })
    } else if (response.status === 403) {
      const { pathname, search, origin, basePath } = request.nextUrl;
      const signInUrl = new URL(`${basePath}/signin`, origin);
      signInUrl.searchParams.append(
        'callbackUrl',
        `${basePath}${pathname}${search}`,
      );
      // 리다이렉트 시킬 수 있는 로직이 필요함
      // 통신구조를 이해할 필요가 있음
      return NextResponse.redirect(signInUrl);
    }
  }
};
// access token만 발급하는 api를 만들자 refreshToken은 그 이후에 호출하면 됨
