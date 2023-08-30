import { getRefreshToken } from '@/service/token';
import { getProfile } from '@/service/user';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const data = await getProfile();
  const response = data.nickname;
  return NextResponse.json(response);
};
