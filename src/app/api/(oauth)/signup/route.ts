import { postSignup, putSignup } from '@/service/user';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

/** 회원가입 POST */
export const POST = async (request: NextRequest) => {
  const body: RequestEssentialRegister = await request.json();
  const data = await postSignup(body);
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
};
/** 회원가입 선택사항 및 회원정보수정 */
export const PUT = async (request: NextRequest) => {
  const body = await request.json();
  const data = await putSignup(body);
  return NextResponse.json(data);
};

// method를 보고 post인지 put인지 구별이 가능함
