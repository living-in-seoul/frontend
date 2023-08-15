import { postSingin } from '@/service/user';
import { NextRequest, NextResponse } from 'next/server';

/** 로그인 POST */
export const POST = async (request: NextRequest) => {
  const body: RequestLogin = await request.json();
  // console.log('body: ', body);
  const data = await postSingin(body);
  console.log('data: ', data);
  const response = NextResponse.json(data);
  // response.cookies.set({
  //   name: 'refreshToken',
  //   value: data.refreshToken,
  //   httpOnly: true,
  // });

  return NextResponse.json(data);
  // ((response)=> response.json());
};
