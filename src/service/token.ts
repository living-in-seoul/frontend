import { cookies } from 'next/headers';

/** 토큰 재발급 */
export const getRefreshToken = async () => {
  const refreshToken = cookies().get('refreshToken')?.value;
  const data = JSON.stringify({ refreshToken: refreshToken });
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/auth/refresh`,
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
