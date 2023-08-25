import { writeBoard } from '@/service/board';
import { refreshToken, setAuthorization } from '@/service/token';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';
/**글쓰기 페이지 post api */

// 데이터 정해지면 type 바꿔라 꼭 잊지말고
export const POST = async (request: NextRequest) => {
  const form = await request.formData();
  const Token = request.cookies.get('accessToken')?.value;
  if (!Token) {
    return new Response('No token', { status: 401 });
  }
  const response = await axios
    .post(`${process.env.NEXT_PUBLIC_SERVER}/posts`, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${Token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return NextResponse.json(response);
  // writeBoard(form, Token)
  //   .then((data) => {
  //     // console.log(data);
  //     return new NextResponse('Success');
  //   })
  //   .catch((error) => {
  //     // console.error(error);
  //     return new NextResponse('Error', { status: 500 });
  //   });
};

export const GET = async (req: NextRequest) => {
  const cookiesStorage = cookies();
  const token = cookiesStorage.get('refreshToken');
  console.log('리프레시 조회하기', token);
  const params = req.nextUrl.searchParams;
  const query = params.get('code');
  return NextResponse.json(query);
};
