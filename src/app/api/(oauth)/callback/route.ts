import { oauthSignin } from '@/service/user';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
export const POST = async (req: NextRequest) => {
  try {
    const body: RequestOauthLogin = await req.json();
    const data = await oauthSignin(body);
    cookies().set({
      name: 'accessToken',
      value: data.accessToken,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 2,
    });
    cookies().set({
      name: 'refreshToken',
      value: data.refreshToken,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24,
    });
    return NextResponse.json(data);
  } catch (err) {
    return new Response('에러입니다', { status: 415 });
  }
};

// export const POST = async (req: NextRequest) => {
//   const body: RequestOauthLogin = await req.json();
//   const data = await oauthGetToken(body);
//   const response = NextResponse.json(data);
//   엑세스토큰까지 받아오는거 완료했는데 이후로 바디에 줘야하는지 헤더에 줘야하는지 정해서 주고 받기 코드
//   return NextResponse.json('hi');
// };
