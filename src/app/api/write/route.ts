import { writeBoard } from '@/service/board';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

/**글쓰기 페이지 post api */

export const config = {
  api: {
    bodyParser: false,
  },
};

// 데이터 정해지면 type 바꿔라 꼭 잊지말고
export const POST = async (request: NextRequest) => {
  console.log('제발 생겨나라....', request.headers);
  const form = await request.formData();
  const data = await writeBoard(form);
  const response = NextResponse.json(data);
  return response;
};
