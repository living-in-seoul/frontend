import { postSingin } from '@/service/user';
import { NextRequest, NextResponse } from 'next/server';

/** 로그인 POST */
export const POST = async (request: NextRequest) => {
  const body: RequestLogin = await request.json();
  // console.log('body: ', body);
  const res = await postSingin(body);
  return NextResponse.json(res);
  // ((response)=> response.json());
};
