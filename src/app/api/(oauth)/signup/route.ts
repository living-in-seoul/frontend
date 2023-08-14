import { postSignup } from '@/service/user';
import { NextRequest, NextResponse } from 'next/server';

/** 회원가입 POST */
export const POST = async (request: NextRequest) => {
  const body: RequestRegister = await request.json();
  // console.log('body: ', body);
  const res = await postSignup(body);
  return NextResponse.json(res);
  // ((response)=> response.json());
};
