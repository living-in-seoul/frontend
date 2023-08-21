import { postSingin } from '@/service/user';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/** 로그인 POST */
export const POST = async (request: NextRequest) => {
  const body: RequestLogin = await request.json();
  const data = await postSingin(body);
  if (data.status === 401) {
    const data = { status: 401, msg: '비밀번호와 아이디가 일치하지 않습니다.' };
    return NextResponse.json(data);
  }
  cookies().set({
    name: 'accessToken',
    value: data.accessToken,
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60,
  });
  cookies().set({
    name: 'refreshToken',
    value: data.refreshToken,
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24,
  });
  // response.cookies.set({
  //   name: 'refreshToken',
  //   value: data.refreshToken,
  //   httpOnly: true,
  // });
  // response.cookies.set({
  //   name: 'accessToken',
  //   value: data.accessToken,
  //   httpOnly: true,
  // });
  return NextResponse.json(data);
  // ((response)=> response.json());
};

// expire 만료시간을 정할 수 있다 정해서 access api 요청 refresh => 로그인 페이지로 보내고
// 로그인이 필요한 페이지에만 api를 붙인다
// enabled 앞서 호출한 데이터가 있을 경우 뒤에있는 비동기통신을 실행시킨다 swr에서 있는지 찾아보자
// 쿠키스토리지에 담겨져있는 것 === 클라이언트에서 관리할 수 있다는 점임
//
