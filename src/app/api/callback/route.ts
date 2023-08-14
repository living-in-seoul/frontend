import { NextResponse } from 'next/server';

export async function GET() {
  // const { searchParams } = req;
  return NextResponse.json('hi');
}
