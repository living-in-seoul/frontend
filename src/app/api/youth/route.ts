import { getYouth } from '@/service/youth';
import { NextRequest, NextResponse } from 'next/server';

/** 구글맵 자동완성 검색어 데이터 가져오기 */
export const GET = async () => {
  const xmlData = await getYouth();
  const response = xmlData.youthPolicyList.youthPolicy;
  return NextResponse.json(response);
};
