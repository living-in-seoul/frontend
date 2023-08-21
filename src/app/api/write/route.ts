import { writeBoard } from '@/service/board';
import { getProfile } from '@/service/user';
import { NextRequest, NextResponse } from 'next/server';

/**글쓰기 페이지 post api */

// 데이터 정해지면 type 바꿔라 꼭 잊지말고
export const POST = async (request: NextRequest) => {
  console.log('토큰이 들어있나요?', request.headers);

  const form = await request.formData();
  for (const [key, value] of form.entries()) {
    console.log('asdfas', key, value);
  }
  getProfile(request);
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
