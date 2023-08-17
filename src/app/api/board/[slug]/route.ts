import { getHomeDatas } from '@/service/home';
import { NextRequest, NextResponse } from 'next/server';

interface Context {
  params: { slug: string };
}

export const GET = async (_: NextRequest, context: Context) => {
  const { slug: gu } = context.params;

  return getHomeDatas(gu).then((data) => NextResponse.json(data));
};
