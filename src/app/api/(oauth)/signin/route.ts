import { postSingin } from '@/service/user';
import { NextRequest, NextResponse } from 'next/server';

/** 로그인 POST */
export const POST = async (request: NextRequest) => {
  const body: RequestLogin = await request.json();
  // console.log('body: ', body);
  const data = await postSingin(body);
  const response = NextResponse.json(data);
  if (response.status === 200) {
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
