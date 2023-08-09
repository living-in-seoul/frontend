// import { NextRequest, NextResponse } from 'next/server';

import { getHomeDatas } from '@/service/home';
import { NextResponse } from 'next/server';

export const GET = async () => {
  return getHomeDatas().then((data) => NextResponse.json(data));
};
