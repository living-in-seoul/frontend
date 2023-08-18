import { writeBoard } from '@/service/board';
import { NextRequest, NextResponse } from 'next/server';

/**글쓰기 페이지 post api */

// 데이터 정해지면 type 바꿔라 꼭 잊지말고
export const POST = async (request: NextRequest) => {
  const form = await request.formData();

  return writeBoard(form)
    .then((data) => {
      console.log(data);
      return new NextResponse('Success');
    })
    .catch((error) => {
      console.error(error);
      return new NextResponse('Error', { status: 500 });
    });
};
