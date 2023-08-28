import { getYouth } from '@/service/youth';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const xmlData = await getYouth();
  const response = xmlData.youthPolicyList.youthPolicy;
  return NextResponse.json(response);
};
