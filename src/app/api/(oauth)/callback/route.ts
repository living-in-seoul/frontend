// import { oauthSignin } from '@/service/oauth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // const body: RequestOauthLogin = await req.json();
  // const data = await oauthSignin(body);
  // const response = NextResponse.json(data);
  // if (response.status === 200) {
  //   response.cookies.set({
  //     name: 'refreshToken',
  //     value: data.refreshToken,
  //     httpOnly: true,
  //   });
  //   response.cookies.set({
  //     name: 'accessToken',
  //     value: data.accessToken,
  //     httpOnly: true,
  //   });
  // }
  return Response;
}
