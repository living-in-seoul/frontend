import { getPlaceByPlaceId } from '@/service/map';
import { postSignup } from '@/service/user';
import { NextRequest, NextResponse } from 'next/server';

/** 회원가입 POST */
export const POST = async (request: NextRequest, response: NextResponse) => {
  const data = await request.json();
  const res = await postSignup(data);
  return NextResponse.json(res);
};
