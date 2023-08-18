import { postSignup } from '@/service/user';
import { NextRequest, NextResponse } from 'next/server';

/** 회원가입 POST */
export const POST = async (request: NextRequest) => {
  const body: RequestRegister = await request.json();
  const data = await postSignup(body);
  return NextResponse.json(data);
};
// movedDate가 바뀌었는데 이거 최신화를 안해놔서 이런거 같음 postman으로도 403이 나오는 걸 뵈니
