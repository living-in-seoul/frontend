import {
  fetchTodaySearch,
  fetchTodaySearchPost,
} from '@/actions/fetchCommunity';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const todaySearch = await fetchTodaySearch();
    return NextResponse.json(todaySearch);
  } catch (error) {
    return NextResponse.json('실패', { status: 404 });
  }
};
