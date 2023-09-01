import { getHomeDatas } from '@/utils/constants/place';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const data = await getHomeDatas();

  const listData = data;

  return NextResponse.json(listData);
};
