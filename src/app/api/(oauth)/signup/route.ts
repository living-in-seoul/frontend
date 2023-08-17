import { postSignup } from '@/service/user';
import { NextRequest, NextResponse } from 'next/server';

/** 회원가입 POST */
export const POST = async (request: NextRequest) => {
  const body: RequestRegister = await request.json();
  const data = await postSignup(body);
  return NextResponse.json(data);
};
