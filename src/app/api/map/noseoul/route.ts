import seoul from '@/../public/noseoul.json';
import { NextResponse } from 'next/server';
export const GET = async () => {
  return NextResponse.json(seoul);
};
