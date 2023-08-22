import { writeBoard } from '@/service/board';
import { refreshToken, setAuthorization } from '@/service/token';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
/**글쓰기 페이지 post api */

// 데이터 정해지면 type 바꿔라 꼭 잊지말고
export const POST = async (request: NextRequest) => {
  console.log('헤더 좀 보자', request.headers);

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

export const GET = async (req: NextRequest) => {
  const cookiesStorage = cookies();
  const token = cookiesStorage.get('refreshToken');
  console.log('리프레시 조회하기', token);
  const params = req.nextUrl.searchParams;
  const query = params.get('code');
  return NextResponse.json(query);
};
