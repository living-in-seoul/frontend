import { cookies } from 'next/headers';

/** 토큰 재발급 */
export const getRefreshToken = async () => {
  const refreshToken = cookies().get('refreshToken')?.value;
  const data = JSON.stringify({ refreshToken: refreshToken });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/token/refresh`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    },
  ).then((response) => response.json());
  return response;
};

/** 모든 토큰 검증 이걸로쓰세요!!
 * @return 성공시 200
 * @return 실��시 403 니깐 리다이렉트 403이면 리다이렉트 /signin으로 !
 */
export async function verifyAndRefreshToken() {
  const accessToken = cookies().get('accessToken')?.value;
  const refreshToken = cookies().get('refreshToken')?.value;

  if (accessToken) {
    return new Response(accessToken, {
      status: 200,
      statusText: 'OK',
    });
  } else {
    if (refreshToken) {
      try {
        const res = await getRefreshToken();
        const newAT = res.accessToken;
        cookies().set({
          name: 'accessToken',
          value: newAT,
          httpOnly: true,
          path: '/',
          maxAge: 60 * 60 * 2,
        });

        return new Response(newAT, {
          status: 201,
          statusText: 'OK',
        });
      } catch (error) {
        return new Response('rt 만료, 다시 로그인해주세요', {
          status: 403,
          statusText: 'rt expired',
        });
      }
    } else {
      return new Response('rt 만료, 다시 로그인해주세요 ', {
        status: 403,
        statusText: 'rt expired',
      });
    }
  }
}
