import { oauthSignin } from '@/service/user';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
export const POST = async (req: NextRequest) => {
  const body: RequestOauthLogin = await req.json();
  const data = await oauthSignin(body);

  if (data && data.status == 415) {
    return new Response('에러입니다', { status: 415 });
  }
  // serialize 부분은 여기서 나오는 것이네 undefined 값을 json()할려니깐 나오는 것임
  const response = NextResponse.json(data);
  cookies().set({
    name: 'accessToken',
    value: data.accessToken,
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24,
  });
  cookies().set({
    name: 'refreshToken',
    value: data.refreshToken,
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24,
  });
  return response;
};

// export const POST = async (req: NextRequest) => {
//   const body: RequestOauthLogin = await req.json();
//   const data = await oauthGetToken(body);
//   const response = NextResponse.json(data);
//   엑세스토큰까지 받아오는거 완료했는데 이후로 바디에 줘야하는지 헤더에 줘야하는지 정해서 주고 받기 코드
//   return NextResponse.json('hi');
// };
