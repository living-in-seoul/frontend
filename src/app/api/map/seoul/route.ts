import seoul from '@/../public/seoul.json';
import { NextResponse } from 'next/server';
export const GET = async () => {
  return NextResponse.json(seoul);
};
