import { postSingin } from '@/service/user';
import { NextRequest, NextResponse } from 'next/server';

/** 로그인 POST */
export const POST = async (request: NextRequest) => {
  const body: RequestLogin = await request.json();
  const data = await postSingin(body);
  if (data.status === 401) {
    const data = { status: 401, msg: '비밀번호와 아이디가 일치하지 않습니다.' };
    return NextResponse.json(data);
  }

  const response = NextResponse.json(data);
  if (data.status === 200) {
    response.cookies.set({
      name: 'refreshToken',
      value: data.refreshToken,
      httpOnly: true,
    });
    response.cookies.set({
      name: 'accessToken',
      value: data.accessToken,
      httpOnly: true,
    });
  }
  return response;
  // ((response)=> response.json());
};
