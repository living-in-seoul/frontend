import { postSignup, putSignup } from '@/service/user';
import { NextRequest, NextResponse } from 'next/server';

/** 회원가입 POST */
export const POST = async (request: NextRequest) => {
  const body: RequestEssentialRegister = await request.json();
  const data = await postSignup(body);
  if (data.status === 400) {
    const data = { status: 400, message: '이미 가입된 이메일입니다.' };
    return NextResponse.json(data);
  }
  if (data.status === 401) {
    const data = { status: 401, message: '이미 가입된 아이디입니다.' };
    return NextResponse.json(data);
  }
  return NextResponse.json(data);
};

export const PUT = async (request: NextRequest) => {
  const body: RequestNonessentialRegister = await request.json();
  const data = await putSignup(body);

  return NextResponse.json(data);
};

// method를 보고 post인지 put인지 구별이 가능함
