import { oauthSignin } from '@/service/user';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body: RequestOauthLogin = await req.json();
  const data = await oauthSignin(body);
  const response = NextResponse.json(data);
  return response;
}
