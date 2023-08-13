import { getPlaceByPlaceId } from '@/service/map';
import { registerDataHandler } from '@/service/user';
import { NextRequest, NextResponse } from 'next/server';

/** 회원가입 POST */
export const POST = async (request: NextRequest, response: NextResponse) => {
  return registerDataHandler().then((data) => NextResponse.json(data));
};
