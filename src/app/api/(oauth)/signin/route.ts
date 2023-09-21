import { postSingin } from '@/service/user';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/** 로그인 POST */
export const POST = async (
  request: NextRequest,
): Promise<Response | NextResponse> => {
  try {
    const body: RequestLogin = await request.json();
    const data = await postSingin(body);
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
  } catch (err) {
    return new Response('잘못된 정보입니다', { status: 401 });
  }
};
