import { writeBoard } from '@/service/board';
import { refreshToken } from '@/service/user';
import { NextRequest, NextResponse } from 'next/server';

/**글쓰기 페이지 post api */

// 데이터 정해지면 type 바꿔라 꼭 잊지말고
export const POST = async (request: NextRequest) => {
  const refresh = await refreshToken(request);
  console.log(`리프레시 어떤놈이 출려되노`, refresh);

  const form = await request.formData();
  for (const [key, value] of form.entries()) {
    console.log('asdfas', key, value);
  }

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
