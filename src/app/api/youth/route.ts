import { getYouth } from '@/service/youth';
import { NextResponse } from 'next/server';

/** 청년 정책 데이터 가져오기 */
export const GET = async () => {
  const xmlData = await getYouth();
  const response = xmlData.youthPolicyList.youthPolicy;
  return NextResponse.json(response);
};
