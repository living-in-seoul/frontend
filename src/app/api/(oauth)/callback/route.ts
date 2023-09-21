import { oauthSignin } from '@/service/user';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
export const POST = async (
  req: NextRequest,
): Promise<Response | NextResponse> => {
  try {
    const body: RequestOauthLogin = await req.json();
    const data = await oauthSignin(body);
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
    return new Response('에러입니다', { status: 415 });
  }
};
