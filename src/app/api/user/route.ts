import { verifyAndRefreshToken } from '@/service/token';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

/** 유저 토큰 검증 */
export const GET = async (_: NextRequest): Promise<Response | NextResponse> => {
  const verify = await verifyAndRefreshToken();

  if (verify.status === 200 || verify.status === 201) {
    return new Response('OK', { status: 200 });
  } else if (verify.status === 403) {
    return new Response('no token', { status: 201 });
  }

  return new Response('no token', { status: 401 });
};

export const DELETE = (_: NextRequest) => {
  const accessToken = cookies().get('accessToken');
  const refreshToken = cookies().get('refreshToken');
  if (accessToken || refreshToken) {
    cookies().delete('accessToken');
    cookies().delete('refreshToken');
  }
  return NextResponse.json('토큰 삭제 완료');
};
